import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      {error}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default ErrorMessage;

