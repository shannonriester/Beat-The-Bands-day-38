import React from 'react';

import store from '../store';

const Modal = React.createClass({
  hideModal: function (e) {
    if (_.toArray(e.target.classList).indexOf('modal-container') !== -1 || _.toArray(e.target.classList).indexOf('back-btn') !== -1) {
      store.searchCollection.get(this.props.band.id).set('viewing', false);
      e.stopPropagation();

      store.session.set('isLoggingIn', false);
      store.session.set('isSigningUp', false);
      this.props.hideModal();

      // let model = store.searchCollection.get(this.props.band.id);
      // store.bandModel.toggleBandModal(model);
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
  // cancelFunction: function (e) {
  //   store.session.set('isLoggingIn', false);
  //   store.session.set('isSigningUp', false);
  //   this.props.hideModal();
  // },
  render: function () {
    let content;
    if (store.session.get('isLoggingIn')) {
      content = (
        <form className="sessionModal-content" onSubmit={this.loginFunction}>
          <h2>Login</h2>
          <input type="text" placeholder="username" ref="username" />
          <input type="password" placeholder="password" ref="password" />
          <input type="submit" value="submit" ref="submit" onClick={this.loginFunction}/>
          <input type="button" value="cancel" ref="cancel" onClick={this.hideModal}/>
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
          <input type="button" value="cancel" ref="cancel" onClick={this.hideModal}/>
        </form>
      );
    } else if (store.session.get('viewingVoteModal')) {
        // let self = this;
        function renderBandModal(band) {
          return (bandModal = <BandModal band={band} hideBandModal={this.hideModal} />);
        };
    }
    return (
      <div className="modal-container" onClick={this.hideModal}>
          {content}
      </div>
    );
  }
});

export default Modal;
