import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div className="login-error"    >
      {error.msg}
    </div>
  );
};

export default ErrorMessage;
