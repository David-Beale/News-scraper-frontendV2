import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      {error.msg}
    </div>
  );
};

export default ErrorMessage;
