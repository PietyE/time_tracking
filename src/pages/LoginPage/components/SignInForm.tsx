import React from "react";

import GoogleSignIn from "components/GoogleSignIn";

const SignInForm = () => {
  return (
    <div className="login-page__signin-form-container">
      <GoogleSignIn />
    </div>
  );
};

export default SignInForm;
