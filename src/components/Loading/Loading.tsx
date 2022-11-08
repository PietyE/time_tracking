import React from "react";

import Spinner from "components/common/Spinner";

const Loading = () => {
  return (
    <div className="loading_container">
      <Spinner size={60} color="primary" />
    </div>
  );
};

export default Loading;
