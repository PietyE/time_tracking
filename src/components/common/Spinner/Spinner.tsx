import type { FC } from "react";
import CircularProgress, {
  type CircularProgressProps,
} from "@mui/material/CircularProgress";

const Spinner: FC<CircularProgressProps> = (props) => {
  return <CircularProgress {...props} />;
};

export default Spinner;
