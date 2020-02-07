import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Travel Journal
      </a>
      <a className="navbar-brand" href="/Login">
        Login
      </a>
      <a className="navbar-brand" href="/Signup">
        Sign Up
      </a>
    </nav>
  );
}

export default Nav;
