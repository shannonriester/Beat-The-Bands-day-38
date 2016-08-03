import React from 'react';

import store from '../../store';
import Modal from '../Modal';

const SessionNav = React.createClass({
//see SessionModel for when to display signup-modal/login-modal
  render: function() {
    
    let sessionNav;
    if (store.session.authtoken) {
      sessionNav = (
        <div className="sessionNav-container">
          <input id="logoutBtn" type="button" value="logout" ref="logout" />
        </div>
        );
    } else if (!store.session.authtoken) {
      sessionNav = (
        <div className="sessionNav-container">
          <input id="loginBtn" type="button" value="login" ref="login" />
          <input id="signupBtn" type="button" value="sign up" ref="signup" />
          {modal}
        </div>
      );
    }
    return (sessionNav);
  }


});

export default SessionNav;
