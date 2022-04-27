import os
from datetime import datetime
from functools import wraps

import paramiko

from invoke import task

# =====   Server IPs    =====
DEV_SERVER_IP = "134.209.240.110"
TEST_SERVER_IP = None
STAGE_SERVER_IP = None
PROD_SERVER_IP = "157.230.98.201"

# =====    SSH Paths    =====
# absolute path on your local machine
DEV_SERVER_SSH_KEY_PATH = ".ssh/TimeTrackingFrontend.pem"
TEST_SERVER_SSH_KEY_PATH = None
STAGE_SERVER_SSH_KEY_PATH = None
PROD_SERVER_SSH_KEY_PATH = "C:\\Users\\viladmin\\.ssh\\id_rsa"

# =====   HOST USERs   =====
DEV_SERVER_HOST_USER = "root"
TEST_SERVER_HOST_USER = None
STAGE_SERVER_HOST_USER = None
PROD_SERVER_HOST_USER = "root"

CONFIG = {
    "dev": {
        "ip": DEV_SERVER_IP,
        "ssh_key_path": DEV_SERVER_SSH_KEY_PATH,
        "host_user": DEV_SERVER_HOST_USER,
        "project_name": "timetracking-front",
        "env_variables": {
            "DOKKU_LETSENCRYPT_EMAIL": "admin@vilmate.com",
            "NPM_CONFIG_PRODUCTION": "true",
            "YARN_PRODUCTION": "true",
            "NODE_OPTIONS": '"--max_old_space_size=4096"'
        },
        "remote_branch_name": "development",
        "local_branch_name": "dev",
        # http://mikebian.co/sending-dokku-container-logs-to-papertrail
        "domain": "timetracking.vilmate.com",
    },
    "test": {},
    "stage": {},
    "prod": {
    "ip": PROD_SERVER_IP,
        "ssh_key_path": PROD_SERVER_SSH_KEY_PATH,
        "host_user": PROD_SERVER_HOST_USER,
        "project_name": "time-tracking-frontend",
        "env_variables": {
            "DOKKU_LETSENCRYPT_EMAIL": "admin@vilmate.com",
            "NPM_CONFIG_PRODUCTION": "true",
            "YARN_PRODUCTION": "true",
            "NODE_OPTIONS": '"--max_old_space_size=2048"'
        },
        "remote_branch_name": "master",
        "local_branch_name": "master",
        # http://mikebian.co/sending-dokku-container-logs-to-papertrail
        "domain": "internal.vilmate.com",
    },
}


def display_message(iterable):
    for line in iterable:
        print(line.strip("\n"))


def check_env_config(wrapped_func):
    @wraps(wrapped_func)
    def checker(ctx, env):
        if not CONFIG.get(env):
            print("Unknown environment")
            return
        else:
            wrapped_func(ctx, env)

    return checker


def ssh_connection(wrapped_func):
    @wraps(wrapped_func)
    def connection_wrapper(ctx, env):
        config = CONFIG[env]
        ssh_key_path = config.get("ssh_key_path")
        ip = config.get("ip")
        host_user = config.get("host_user")
        if not (ssh_key_path and ip and host_user):
            print("'ssh_key_path', 'ip' and 'host_user' should be set in config")
            return
        else:
            key = paramiko.RSAKey.from_private_key_file(config["ssh_key_path"])
            client = paramiko.SSHClient()
            client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            client.connect(config["ip"], username=config["host_user"], pkey=key)

            wrapped_func(ctx, env, client)
            client.close()
            print("-" * 40)
            print()

    return connection_wrapper


@task
@check_env_config
@ssh_connection
def check_server_connection(ctx, env, client):
    stdin, stdout, stderr = client.exec_command("lsb_release -a")
    display_message(stdout)
    display_message(stderr)


@task
@check_env_config
@ssh_connection
def install_dokku(ctx, env, client):
    print("Searching for Dokku...")
    stdin, stdout, stderr = client.exec_command("dokku version")

    is_dokku_installed = not any(
        map(lambda x: "dokku: command not found" in x, [x for x in list(stdout) + list(stderr)])
    )

    if not is_dokku_installed:
        print("Dokku not installed. Installing Dokku...")
        stdin, stdout, stderr = client.exec_command(
            "wget https://raw.githubusercontent.com/dokku/dokku/v0.19.13/bootstrap.sh"
        )
        display_message(stdout)
        display_message(stderr)

        stdin, stdout, stderr = client.exec_command("sudo DOKKU_TAG=v0.19.13 bash bootstrap.sh")
        display_message(stdout)
        display_message(stderr)

    else:
        print("Dokku is installed")

    print("dokku version")
    stdin, stdout, stderr = client.exec_command("dokku version")
    display_message(stdout)
    display_message(stderr)


@task
@check_env_config
def add_key_to_dokku(ctx, env):
    """After that step you can run next 'ssh -t dokku@{server_ip} {dokku command}'"""
    config = CONFIG[env]

    ctx.run(
        f"cat ~/.ssh/id_rsa.pub | ssh -i {config['ssh_key_path']} "
        f"-o 'IdentitiesOnly yes' "
        f"{config['host_user']}@{config['ip']} sudo dokku ssh-keys:add $USER",
        pty=True,
    )


@task
@check_env_config
@ssh_connection
def create_project(ctx, env, client):
    config = CONFIG[env]
    if not config.get("project_name"):
        print("'project_name' doesn't set in config")
        return

    project_name = config["project_name"]
    print(f'Creating project "{project_name}"...')
    stdin, stdout, stderr = client.exec_command("sudo dokku apps:list")

    is_project_created = any(map(lambda x: project_name in x, list(stdout)))

    if is_project_created:
        print(f"Project {project_name} already exists")
    else:
        stdin, stdout, stderr = client.exec_command(f"sudo dokku apps:create {project_name}")
        display_message(stdout)
        display_message(stderr)


@task
@check_env_config
@ssh_connection
def create_nginx_conf_files(ctx, env, client):
    config = CONFIG[env]
    project_name = config.get("project_name")
    if not project_name:
        print('"project_name" should be set in config')

    print(f"Sniffing dirrectory /home/dokku/{project_name}/ ...")

    stdin, stdout, stderr = client.exec_command(f"ls -la /home/dokku/{project_name}/")
    stdout = list(stdout)
    stderr = list(stderr)
    conf_dir_exists = any(map(lambda x: "nginx.conf.d" in x, stdout))
    if not stderr and not conf_dir_exists:
        print(f"Creating directory /home/dokku/{project_name}/nginx.conf.d/")
        stdin, stdout, stderr = client.exec_command(
            f"sudo mkdir /home/dokku/{project_name}/nginx.conf.d/"
        )
        display_message(stdout)
        display_message(stderr)
    else:
        print(f"Directory /home/dokku/{project_name}/nginx.conf.d/ already exists")

    # upload.conf
    print("Processing upload.conf ...")

    data_to_write = ["client_max_body_size 50M;"]

    stdin, stdout, stderr = client.exec_command(
        f"cat /home/dokku/{project_name}/nginx.conf.d/upload.conf"
    )

    need_create_file = any(map(lambda x: "No such file or directory" in x, list(stderr)))

    if need_create_file:
        print("Creating file")
        command = f'echo "client_max_body_size 50M;" > /home/dokku/{project_name}/nginx.conf.d/upload.conf'
        stdin, stdout, stderr = client.exec_command(f"sudo bash -c '{command}'")
        display_message(stdout)
        display_message(stderr)
    else:
        stdout = list(stdout)
        need_to_be_written = []
        for data in data_to_write:
            if not any(map(lambda x: x.strip() in data, stdout)):
                need_to_be_written.append(data)

        if need_to_be_written:
            data = "\n".join(need_to_be_written)

        if need_to_be_written:
            data = "\n".join(need_to_be_written)
            print(f"Writing \n{data}\n to timeout.conf ...")
            command = f'echo "{data}" >> /home/dokku/{project_name}/nginx.conf.d/upload.conf'
            stdin, stdout, stderr = client.exec_command(f"sudo bash -c '{command}'")
            display_message(stdout)
            display_message(stderr)
        else:
            print("All data is up to date")

    print("File upload.conf processing compete")


@task
@check_env_config
@ssh_connection
def install_postgres_plugin(ctx, env, client):
    print("Searching for postgres plugin...")

    stdin, stdout, stderr = client.exec_command("dokku plugin:list")
    is_postgres_installed = any(map(lambda x: "postgres" in x, list(stdout)))

    if not is_postgres_installed:
        print("Installing postgres plugin...")
        stdin, stdout, stderr = client.exec_command(
            "sudo dokku plugin:install " "https://github.com/dokku/dokku-postgres.git postgres"
        )
        display_message(stdout)
        display_message(stderr)

    print("Postgres plugin installed")


@task
@check_env_config
@ssh_connection
def create_postgres_service(ctx, env, client):
    config = CONFIG[env]
    service_name = config.get("postgres_service_name")
    postgres_image = config.get("postgres_image")
    postgres_image_version = config.get("postgres_image_version")
    if not (service_name and postgres_image and postgres_image_version):
        print(
            '"service_name", "postgres_image" and "postgres_image_version" should be set in config'
        )
        return

    print("Creating postgres service...")
    stdin, stdout, stderr = client.exec_command("dokku postgres:list")

    is_service_created = any(map(lambda x: service_name in x, list(stdout)))

    if is_service_created:
        print(f'Service "{service_name}" already created')
    else:
        stdin, stdout, stderr = client.exec_command(
            f'export POSTGRES_IMAGE="{postgres_image}"; '
            f'export POSTGRES_IMAGE_VERSION="{postgres_image_version}"; '
            f"dokku postgres:create {service_name}"
        )
        display_message(stderr)
        display_message(stdout)


@task
@check_env_config
@ssh_connection
def link_postgres_service(ctx, env, client):
    config = CONFIG[env]
    service_name = config.get("postgres_service_name")
    project_name = config.get("project_name")

    if not (service_name and project_name):
        print('"service_name" and "project_name" should be set in config')
        return

    print("Linking postgres service...")
    stdin, stdout, stderr = client.exec_command(f"dokku postgres:info {service_name}")

    err = list(stderr)

    if err:
        display_message(err)
        return

    is_service_linked = any(map(lambda x: "Links" in x and project_name in x, list(stdout)))

    if is_service_linked:
        print(f'Service "{service_name}" already linked')
    else:
        stdin, stdout, stderr = client.exec_command(
            f"dokku postgres:link " f"{service_name} " f"{project_name}"
        )
        display_message(stderr)
        display_message(stdout)


@task
@check_env_config
@ssh_connection
def install_redis_plugin(ctx, env, client):
    print("Searching for redis plugin...")
    stdin, stdout, stderr = client.exec_command("dokku plugin:list")
    is_redis_installed = any(map(lambda x: "redis" in x, list(stdout)))

    if not is_redis_installed:
        print("Installing redis plugin...")

        stdin, stdout, stderr = client.exec_command(
            "sudo dokku plugin:install " "https://github.com/dokku/dokku-redis.git redis"
        )
        display_message(stdout)
        display_message(stderr)

    print("Redis plugin installed.")


@task
@check_env_config
@ssh_connection
def create_redis_service(ctx, env, client):
    config = CONFIG[env]
    service_name = config["redis_service_name"]
    redis_image = config["redis_image"]
    redis_image_version = config["redis_image_version"]

    if not (service_name and redis_image and redis_image_version):
        print('"service_name", "redis_image" and "redis_image_version" should be set in config')
        return

    stdin, stdout, stderr = client.exec_command("dokku redis:list")

    is_service_created = any(map(lambda x: service_name in x, list(stdout)))

    if is_service_created:
        print(f'Service "{service_name}" already created')
    else:
        stdin, stdout, stderr = client.exec_command(
            f'export REDIS_IMAGE="{redis_image}"; '
            f'export REDIS_IMAGE_VERSION="{redis_image_version}"; '
            f"dokku redis:create {service_name}"
        )
        display_message(stderr)
        display_message(stdout)


@task
@check_env_config
@ssh_connection
def link_redis_service(ctx, env, client):
    config = CONFIG[env]
    service_name = config.get("redis_service_name")
    project_name = config.get("project_name")

    if not (service_name and project_name):
        print('"service_name" and "project_name" should be set in config')
        return

    stdin, stdout, stderr = client.exec_command(f"dokku redis:info {service_name}")

    err = list(stderr)

    if err:
        display_message(err)
        client.close()
        return

    is_service_linked = any(map(lambda x: "Links" in x and project_name in x, list(stdout)))

    if is_service_linked:
        print(f'Service "{service_name}" already linked')
    else:
        stdin, stdout, stderr = client.exec_command(
            f"dokku redis:link " f"{service_name} " f"{project_name}"
        )
        display_message(stderr)
        display_message(stdout)


@task
@check_env_config
@ssh_connection
def create_env_variables(ctx, env, client):
    config = CONFIG[env]
    env_variables = config.get("env_variables")
    project_name = config.get("project_name")

    if not (env_variables and project_name):
        print('"env_variables" and "project_name" should be set')
        return

    stdin, stdout, stderr = client.exec_command(f"dokku config {project_name}")

    err = list(stderr)
    if err:
        display_message(err)
        client.close()
        return

    out = list(stdout)
    variables_changed = False
    for variable, value in env_variables.items():
        if not any(map(lambda x: variable in x, out)):
            if value is not None:
                val = value
            else:
                val = input(f'Enter "{variable}": ')
            variables_changed = True
            stdin, stdout, stderr = client.exec_command(
                f"dokku config:set " f"--no-restart " f"{project_name} " f'{variable}="{val}"'
            )
            display_message(stderr)
            display_message(stdout)

    if variables_changed:
        stdin, stdout, stderr = client.exec_command(f"dokku ps:restart {project_name}")
    else:
        print("No variables has been changed")

    display_message(stderr)
    display_message(stdout)

    client.close()


@task
@check_env_config
@ssh_connection
def install_logspout(ctx, env, client):
    print("Searching for Logspout plugin...")
    stdin, stdout, stderr = client.exec_command("dokku plugin:list")

    is_logspout_installed = any(map(lambda x: "logspout" in x, list(stdout)))

    if not is_logspout_installed:
        print("Logspout not installed. Installing Logspout...")
        stdin, stdout, stderr = client.exec_command(
            "sudo dokku plugin:install " "https://github.com/michaelshobbs/dokku-logspout.git"
        )
        display_message(stdout)
        display_message(stderr)

    else:
        print("Logspout is installed")

    stdin, stdout, stderr = client.exec_command("sudo dokku logspout:info")
    display_message(stdout)
    display_message(stderr)


@task
@check_env_config
@ssh_connection
def add_logspout_server(ctx, env, client):
    config = CONFIG[env]
    logspout_server = config.get("logspout_server")

    if not logspout_server:
        print('"logspout_server" parameter not set in config')
        return

    print("Setting-up logspot server")
    stdin, stdout, stderr = client.exec_command(
        f"sudo dokku logspout:server syslog+tls://{logspout_server}"
    )
    display_message(stdout)
    display_message(stderr)


@task
@check_env_config
@ssh_connection
def stop_logspout(ctx, env, client):
    print("Stopping logspout...")
    stdin, stdout, stderr = client.exec_command(f"sudo dokku logspout:stop")
    display_message(stdout)
    display_message(stderr)


@task
@check_env_config
@ssh_connection
def start_logspout(ctx, env, client):
    print("Starting logspout...")
    stdin, stdout, stderr = client.exec_command(f"sudo dokku logspout:start")
    display_message(stdout)
    display_message(stderr)


@task
@check_env_config
def add_remote_branch(ctx, env):
    config = CONFIG[env]
    remote_branch_name = config.get("remote_branch_name")
    remote_ip = config.get("ip")
    project_name = config.get("project_name")

    if not (remote_branch_name and remote_ip and project_name):
        print('"remote_branch_name", "remote_ip" and "project_name" should be set')
        return

    print("Check dokku repo in remotes...")

    remotes = ctx.run("git remote -v", hide="out")

    remote_address = f"dokku@{remote_ip}:{project_name}"

    if not any(
        map(lambda x: remote_branch_name in x and remote_address in x, remotes.stdout.splitlines())
    ):
        print(f'Add remote branch "{remote_branch_name}" to remotes')
        ctx.run(f"git remote add {remote_branch_name} {remote_address}")
        ctx.run("git remote -v")
    else:
        print(f'Dokku remote branch "{remote_branch_name}" already exists')


@task
@check_env_config
@ssh_connection
def install_letsencrypt_plugin(ctx, env, client):
    config = CONFIG[env]
    domain = config.get("domain")
    project_name = config.get("project_name")
    letsencrypt_email = config.get("env_variables", {}).get("DOKKU_LETSENCRYPT_EMAIL")

    if not (domain and letsencrypt_email and project_name):
        print('Setup "domain" and "env_variables"["DOKKU_LETSENCRYPT_EMAIL"] at first')
        return

    print("Preparing to install Letsencrypt plugin...")

    stdin, stdout, stderr = client.exec_command(f"dokku config {project_name}")

    is_letsencrypt_email_setup = any(
        [letsencrypt_email in line for line in stdout if "DOKKU_LETSENCRYPT_EMAIL" in line]
    )

    if not is_letsencrypt_email_setup:
        stdin, stdout, stderr = client.exec_command(
            f"dokku config:set "
            f"--no-restart "
            f"{project_name} "
            f'DOKKU_LETSENCRYPT_EMAIL="{letsencrypt_email}"'
        )
        display_message(stderr)
        display_message(stdout)

    stdin, stdout, stderr = client.exec_command(f"sudo dokku domains:report")
    display_message(stderr)
    installed_domains = [
        line.split(":")[1].strip() for line in stdout if "Domains app vhosts" in line
    ]

    if domain not in installed_domains:
        print("Add required domain: {domain}...")
        stdin, stdout, stderr = client.exec_command(
            f"sudo dokku domains:add {project_name} {domain}"
        )
        display_message(stderr)
        display_message(stdout)

    domains_to_remove = filter(lambda x: domain not in x, installed_domains)

    for domain_to_remove in domains_to_remove:
        print(f"Removing domain {domain_to_remove}...")
        stdin, stdout, stderr = client.exec_command(
            f"sudo dokku domains:remove {project_name} {domain_to_remove}"
        )
        display_message(stderr)
        display_message(stdout)
        print(f"Domain {domain_to_remove} removed")

    stdin, stdout, stderr = client.exec_command(f"sudo dokku plugin:list")

    is_letsencrypt_installed = any(["letsencrypt" in line for line in stdout])
    if not is_letsencrypt_installed:

        print("Installing Letsencrypt plugin...")
        stdin, stdout, stderr = client.exec_command(
            "sudo dokku plugin:install " "https://github.com/dokku/dokku-letsencrypt.git"
        )
        display_message(stderr)
        display_message(stdout)

        stdin, stdout, stderr = client.exec_command(
            f"cat /home/dokku/{project_name}/nginx.conf.d/letsencrypt.conf"
        )

        need_create_file = any(map(lambda x: "No such file or directory" in x, list(stderr)))

        if need_create_file:
            print("Creating letsencrypt.conf")
            command = f'echo "" > /home/dokku/{project_name}/nginx.conf.d/letsencrypt.conf'
            stdin, stdout, stderr = client.exec_command(f"sudo bash -c '{command}'")
            display_message(stderr)
            display_message(stdout)
            print("letsencrypt.conf has been created")

            print("Add permissions to letsencrypt.conf")
            stdin, stdout, stderr = client.exec_command(
                f"sudo chmod 777 /home/dokku/{project_name}/nginx.conf.d/letsencrypt.conf"
            )
            display_message(stderr)
            display_message(stdout)
            print("Permissions to letsencrypt.conf has been added")

        print(f"Enable plugin for {project_name}")
        stdin, stdout, stderr = client.exec_command(f"sudo dokku letsencrypt {project_name}")
        display_message(stderr)
        display_message(stdout)

        print("Enabling certificate auto update")
        stdin, stdout, stderr = client.exec_command("sudo dokku letsencrypt:cron-job --add")
        display_message(stderr)
        display_message(stdout)

    else:
        print("Letsencrypt plugin previously installed")

    stdin, stdout, stderr = client.exec_command("sudo dokku letsencrypt:ls")
    display_message(stderr)
    display_message(stdout)


@task
def run_dokku_command(ctx, env, command, arguments=None):
    if not arguments:
        arguments = ""

    config = CONFIG.get(env, {})
    ip = config.get("ip")
    project_name = config.get("project_name")

    if not (ip and project_name):
        print('"ip" and "project_name" should be set in config')
        return

    ctx.run(f"ssh -t dokku@{ip} {command} {project_name} {arguments}", pty=True)


@task
@check_env_config
def create_db_dump(ctx, env):
    """Create database dump in folder .db_backups/{local_branch_name}"""
    config = CONFIG[env]
    if not all(
        (config.get("local_branch_name"), config.get("postgres_service_name"), config.get("ip"))
    ):
        print('"local_branch_name" and "postgres_service_name" required in config')
        return

    project_backup_folder = ".db_backups"
    subfolder = config["local_branch_name"]

    filename = f'{config["local_branch_name"]}-{datetime.now().strftime("%Y%m%d-%H%M%S")}.db'
    export_dir = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), project_backup_folder, subfolder
    )
    export_path = os.path.join(export_dir, filename)

    if not os.path.exists(export_dir):
        os.makedirs(export_dir)

    print("Dump creating stared...")
    ctx.run(
        f'ssh -tt dokku@{config["ip"]} postgres:export {config["postgres_service_name"]} > "{export_path}"'
    )
    print(f"Dump created. Path: {export_path}")


@task
def deploy(ctx, env, branch=None, force=False):
    config = CONFIG.get(env)
    if not config:
        print("Unknown environment")
        return

    local_branch_name = branch or config.get("local_branch_name")
    remote_branch_name = config.get("remote_branch_name")

    if not (local_branch_name and remote_branch_name):
        print('"local_branch_name" and "remote_branch_name" should be set in config')
        return

    ctx.run(f'git push {remote_branch_name} {local_branch_name}:master {"-f" if force else ""}')


@task
def setup_server(ctx, env):
    check_server_connection(ctx, env)
    install_dokku(ctx, env)
    # add_key_to_dokku(ctx, env)  # use this command only once
    create_project(ctx, env)
    create_nginx_conf_files(ctx, env)

    # postgres
    # install_postgres_plugin(ctx, env)
    # create_postgres_service(ctx, env)
    # link_postgres_service(ctx, env)

    # redis
    # install_redis_plugin(ctx, env)
    # create_redis_service(ctx, env)
    # link_redis_service(ctx, env)

    create_env_variables(ctx, env)
    #
    # # git
    add_remote_branch(ctx, env)
    #
    # # deploy
    deploy(ctx, env)

    # letsencrypt
    install_letsencrypt_plugin(ctx, env)

    print(
        f"!!!IMPORTANT!!!\n"
        f"After setup is finished visit site by IP and complete setup by clicking some buttons"
    )
