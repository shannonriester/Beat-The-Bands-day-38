import React from 'react';

import store from '../../store';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';

const SessionNav = React.createClass({

  render: function() {
    let sessionNav;
    if (session.authtoken) {
      sessionNav = (
        <div className="sessionNav-container">
          <input id="logoutBtn" type="button" value="logout" ref="logout" />
        </div>);
    } else {
      sessionNav = (
        <div className="sessionNav-container">
          <input id="loginBtn" type="button" value="login" ref="login" />
          <input id="signupBtn" type="button" value="sign up" ref="signup" />
        </div>
      );
    }
    return (
        {sessionNav}
    );
  }
});

export default SessionNav;
