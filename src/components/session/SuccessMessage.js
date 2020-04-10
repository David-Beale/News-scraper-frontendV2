import React from "react";

const ErrorMessage = ({ success }) => {
  return (
    <div className="login-success"    >
      {success}
    </div>
  );
};

export default ErrorMessage;
