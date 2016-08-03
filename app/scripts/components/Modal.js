import React from 'react';

import store from '../store';

const Modal = React.createClass({
  loginFunction: function (e){
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;

    store.session.login(username, password);
    this.props.hideModal();
  },
  signupFunction: function (e){
    store.session.signup();
    this.props.hideModal();
  },
  cancelFunction: function () {
    store.session.set('isLoggingIn', false);
    this.props.hideModal();
  },
  render: function () {
    let content;
    if (store.session.get('isLoggingIn')) {
      content = (
        <form className="modal-content" onSubmit={this.loginFunction}>
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
          <input type="password2" placeholder="password2" ref="password2" />
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
