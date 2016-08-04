import React from 'react';

import store from '../store';

const Modal = React.createClass({
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
  cancelFunction: function () {
    store.session.set('isLoggingIn', false);
    store.session.set('isSigningUp', false);
    this.props.hideModal();
  },
  render: function () {
    let content;
    if (store.session.get('isLoggingIn')) {
      content = (
        <form className="sessionModal-content" onSubmit={this.loginFunction}>
          <h2>Login</h2>
          <input type="text" placeholder="username" ref="username" />
          <input type="password" placeholder="password" ref="password" />
          <input type="submit" value="submit" ref="submit" onClick={this.loginFunction}/>
          <input type="button" value="cancel" ref="cancel" onClick={this.cancelFunction}/>
        </form>
      );
    } else if (store.session.get('isSigningUp')) {
      content = (
        <form className="modal-content" onSubmit={this.signupFunction}>
          <h2>Sign Up with Beats!</h2>
          <input type="text" placeholder="username" ref="username" />
          <input type="text" placeholder="email" ref="email" />
          <input type="password" placeholder="password" ref="password" />
          <input type="submit" value="submit" ref="submit" onClick={this.signupFunction} />
          <input type="button" value="cancel" ref="cancel" onClick={this.cancelFunction}/>
        </form>
      );
    }
    return (
      <div className="modal-container">
          {content}
      </div>
    );
  }
});

export default Modal;
