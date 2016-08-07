import React from 'react';
import _ from 'underscore';

import store from '../store';

const Modal = React.createClass({
  hideModal: function (e) {
    if (_.toArray(e.target.classList).indexOf('modal-container') !== -1 || _.toArray(e.target.classList).indexOf('back-btn') !== -1) {

      store.session.set('isLoggingIn', false);
      store.session.set('isSigningUp', false);
      this.props.hideModal();
    }
  },
  loginFunction: function (e){
    e.preventDefault();

    let username = this.refs.username.value;
    let password = this.refs.password.value;

    store.session.login(username, password);
    store.session.set('isLoggingIn', false);

    this.props.hideModal();
  },
  signupFunction: function (e){
    e.preventDefault();

    let username = this.refs.username.value;
    let password = this.refs.password.value;

    store.session.signup(username, password);
    store.session.set('isSigningUp', false);

    this.props.hideModal();
  },
  cancelFunction: function (e) {
      store.session.set('isLoggingIn', false);
      store.session.set('isSigningUp', false);
      this.props.hideModal();
  },
  render: function () {
    let content;
    if (store.session.get('isLoggingIn')) {
      content = (
        <form className="modal-content" onSubmit={this.loginFunction}>
          <h2>Login</h2>
          <input className="userInfo" type="text" placeholder="username" ref="username" />
          <input className="userInfo" type="password" placeholder="password" ref="password" />
          <input className="userInfoBtn" type="submit" value="submit" ref="submit" onClick={this.loginFunction}/>
          <input className="userInfoBtn" type="button" value="cancel" ref="cancel" onClick={this.cancelFunction}/>
        </form>
      );
    } else if (store.session.get('isSigningUp')) {
      content = (
        <form className="modal-content" onSubmit={this.signupFunction}>
          <h2>Sign Up with Beats!</h2>
          <input className="userInfo" type="text" placeholder="username" ref="username" />
          <input className="userInfo" type="text" placeholder="email" ref="email" />
          <input className="userInfo" type="password" placeholder="password" ref="password" />
          <input className="userInfoBtn" type="submit" value="submit" ref="submit" onClick={this.signupFunction} />
          <input className="userInfoBtn" type="button" value="cancel" ref="cancel" onClick={this.cancelFunction}/>
        </form>
      );
    }
    return (
      <div className="modal-container" onClick={this.hideModal}>
          {content}
      </div>
    );
  }
});

export default Modal;
