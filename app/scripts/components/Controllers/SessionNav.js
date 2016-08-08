import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import store from '../../store';
import Modal from '../Modal';

const SessionNav = React.createClass({
  getInitialState: function () {
    return {
      hideModal: true,
      authtoken: store.session.get('authtoken'),
      // session: store.session,
    }
  },
  updateState: function () {
    this.setState({authtoken: store.session.get('authtoken')});
    store.votedCollection.reset();
    // if (store.session.get('authtoken')) {
    //   store.votedCollection.fetch();
    // }

  },
  componentDidMount: function () {
    store.session.on('change', this.updateState);
    // store.votedCollection.reset();
    // store.session.getLocation().then((position) => {
    //   console.log(position);
    // });
  },
  componentWillUnmount: function () {
    store.session.off('change', this.updateState);
  },
  runLogout: function () {
    store.session.logout();
    store.session.set('isLogginIn', false);
    store.session.set('isSigningUp', false);
    // hashHistory.push(`/`);
  },
  runLogin: function () {
    this.setState({hideModal:false});
    store.session.set('isLoggingIn', true);
  },
  runSignup: function () {
    this.setState({hideModal:false});
    store.session.set('isSigningUp', true);
  },
  hideModal: function() {
    this.setState({hideModal:true})
  },
  render: function () {
    let modal;
    if (!this.state.hideModal) {
      modal = <Modal hideModal={this.hideModal}/>;
    }
    let divider;
    if (!this.state.authtoken) {
      divider = <p className="divider"></p>;
    } else {
      divider = <p className="divider loggedIn">Hi, {store.session.get('username')}!</p>
    }

    let sessionNav;
    if (localStorage.authtoken) {
      sessionNav = (
        <div className="sessionNav-container">
          {divider}
          <input className="sessionBtns" id="logoutBtn" type="button" value="logout" ref="logout" onClick={this.runLogout} />
        </div>
        );
    } else {
      sessionNav = (
        <div className="sessionNav-container">
          {divider}
          <input className="sessionBtns" id="loginBtn" type="button" value="login" ref="login" onClick={this.runLogin}/>
          <input className="sessionBtns" id="signupBtn" type="button" value="sign up" ref="signup" onClick={this.runSignup}/>
          {modal}
        </div>
      );
    }

    return sessionNav;
  }


});

export default SessionNav;
