import type { FC } from "react";

import GoogleLogin, {
  type GoogleLoginResponse,
  // type GoogleLoginResponseOffline,
} from "react-google-login";

import SignInGoogleButton from "components/SignInGoogleButton";
import { userGoogleSignIn } from "store/asyncActions/profile";
import { useAppDispatch } from "hooks/redux";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

const GoogleSignIn: FC = () => {
  const dispatch = useAppDispatch();

  const handleClickGoogleLogin = (response: any) => {
    const _response = response as GoogleLoginResponse;
    if (_response.tokenId) {
      dispatch(userGoogleSignIn({ token: _response.tokenId }));
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      render={(props) => <SignInGoogleButton {...props} />}
      onSuccess={handleClickGoogleLogin}
      onFailure={() => {
        console.log("error");
      }}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleSignIn;
