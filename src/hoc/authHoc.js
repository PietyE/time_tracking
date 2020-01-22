import React from "react";

const authHoc = Comp => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.bootstrap = this.bootstrap.bind(this);
      this.checkUserAuth = this.checkUserAuth.bind(this);
    }
    componentDidMount() {
      this.bootstrap();
    }

    bootstrap() {
      this.checkUserAuth();
    }

    checkUserAuth() {
      const {
        logOut,
        setUsersOauthData,
        history: { push, replace }
      } = this.props;

      const user_auth_data = localStorage.getItem("user_auth_data");

      const data_user = JSON.parse(user_auth_data);
      console.log("data_user", data_user);

      if (!data_user) {
        replace("/auth");
        //  return;
      } else {
        const { access_token, expires_at } = data_user;
        const nowTime = new Date().getTime();

        if (access_token && expires_at && nowTime < expires_at) {
          setUsersOauthData(data_user);
          replace("/main");
          // return;
        } else {
          logOut();
          replace("/auth");
          ///return;
        }
      }
    }

    render() {
      console.log("authHoc", this.props);
      return <Comp {...this.props} />;
    }
  };
};

export default authHoc;
