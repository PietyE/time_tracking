pipeline {

    agent any

//     stages {
//         stage('Checkout') {
//             steps {
//                 checkout([$class: 'GitSCM', branches: [[name: '*/stage']], extensions: [], userRemoteConfigs:
//                 [[credentialsId: 'azure_repos', url: 'https://vilmate.visualstudio.com/DefaultCollection/Time%20Tracking/_git/Time%20Tracking']]])
//             }
//         }

        stage('Deploy') {
            steps {
                sshagent(['jenkins']) {
                    sh '''
	                    if git remote | grep dokku > /dev/null;
	                    then
	                    echo "dokku already exist";
	                    else
	                    echo "dokku remote does not already exist";
	                    git remote add dokku dokku@159.89.4.200:timetracking-front;
	                    fi
	                    git remote -v
                        git push -f dokku HEAD:master
                    '''
                }
            }
        }
    }
}