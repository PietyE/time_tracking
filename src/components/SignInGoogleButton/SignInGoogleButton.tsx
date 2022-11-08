import Button, { ButtonProps } from "@mui/material/Button";

import GoogleLogo from "components/common/svg/GoogleLogo";

//readonly render?: (props: { onClick: () => void, disabled?: boolean }) => JSX.Element;

interface ISignInGoogleButtonProps extends ButtonProps {
  onClick: () => void;
  disabled?: boolean | undefined;
}

const SignInGoogleButton: React.FC<ISignInGoogleButtonProps> = (props) => {
  return (
    <Button
      className="google-button"
      startIcon={<GoogleLogo />}
      fullWidth
      {...props}
    >
      Login with Google
    </Button>
  );
};

export default SignInGoogleButton;
