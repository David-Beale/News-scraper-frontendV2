import React from "react";

const ErrorMessage = ({ success }) => {
  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      {success}
    </div>
  );
};

export default ErrorMessage;
