import React from "react";

const Header = (props) => {
  return (
    <header>
      {props.user === null ? (
        <button onClick={props.userLogin}>Sign in</button>
      ) : (
        <button onClick={props.userLogout}>Sign off</button>
      )}
      <p>{props.user !== null && `Welcome, ${props.user}`}</p>
      <h1>NO NEWS IS GOOD NEWS</h1>
    </header>
  );
};

export default Header;
