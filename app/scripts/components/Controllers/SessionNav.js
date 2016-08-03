import React from 'react';

import store from '../../store';
import Modal from '../Modal';

const SessionNav = React.createClass({
  getInitialState: function () {
    return {
      hideModal: true,
    }
  },
  runLogout: function () {},
  runLogin: function () {
    this.setState({hideModal:false});
    store.session.set('isLoggingIn', true);
  },
  hideModal: function() {
    this.setState({hideModal:true})
  },
  render: function() {
    let modal;
    if (!this.state.hideModal) {
      modal = <Modal hideModal={this.hideModal}/>;
    }

    let sessionNav;
    if (store.session.authtoken) {
      sessionNav = (
        <div className="sessionNav-container">
          <input id="logoutBtn" type="button" value="logout" ref="logout" onClick={this.runLogout} />
        </div>
        );
    } else if (!store.session.authtoken) {
      sessionNav = (
        <div className="sessionNav-container">
          <input id="loginBtn" type="button" value="login" ref="login" onClick={this.runLogin}/>
          <input id="signupBtn" type="button" value="sign up" ref="signup" onClick={this.runSignup}/>
          {modal}
        </div>
      );
    }

    return sessionNav;
  }


});

export default SessionNav;
