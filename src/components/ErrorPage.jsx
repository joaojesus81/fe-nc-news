import React from "react";

const ErrorPage = ({ error: { msg, status } }) => {
  return (
    <p>{`Oh oh... It seems the request you made returned a ${status} error, with the following msg: ${msg}`}</p>
  );
};

export default ErrorPage;
