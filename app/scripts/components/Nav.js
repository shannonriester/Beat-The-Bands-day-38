import React from 'react';

const Nav = React.createClass({
  render: function() {
    return (
      <nav className="Nav">
        <input id="loginBtn" type="button" value="login" ref="login" />
        <input id="signupBtn" type="button" value="sign up" ref="signup" />
        <input id="logoutBtn" type="button" value="logout" ref="logout" />
      </nav>
    );
  }
});

export default Nav;
