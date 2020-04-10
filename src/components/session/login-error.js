import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div className="login-error">
      {error}
    </div>
  )
}

export default ErrorMessage;

