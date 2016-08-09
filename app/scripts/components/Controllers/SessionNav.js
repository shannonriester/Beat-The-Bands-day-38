import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import store from '../../store';
import Modal from '../Modal';

const SessionNav = React.createClass({
  getInitialState: function () {
    return {
      hideModal: true,
      authtoken: localStorage.getItem('authtoken'),
      // username: store.sesssion.get('username'),
    }
  },
  updateState: function () {
    if (this.state.authtoken === store.anonToken) {
      console.log('the authtoken is the anonToken');
    } else {
      this.setState({authtoken: store.session.get('authtoken')});
      store.votedCollection.reset();
    }
  },
  componentDidMount: function () {
    store.session.on('change', this.updateState);
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
    hashHistory.push(`/`);
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
    if (localStorage.authtoken === store.anonToken) {
      divider = <p className="divider"></p>;
    } else {
      divider = <p className="divider loggedIn">Hi, {store.session.get('username')}!</p>
    }

    let sessionNav;
    if (localStorage.authtoken !== store.anonToken) {
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
