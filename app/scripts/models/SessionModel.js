import Backbone from 'backbone';

import store from '../store';

const SessionModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: function() {
    return `https://baas.kinvey.com/user/${store.settings.appKey}/login`;
  },
  defaults: {
    username: '',
    votes: '',
    isLoggingIn: false,
    isSigningUp: false,
  },
  parse: function(response) {
    if (response) {
      return {
        username: response.username,
        response: response._Id,
        authtoken: response._kmd.authtoken
      };
    }
  },
  login: function(username, password) {
    this.save(
      { username: username, password: password},
      { success: (model, response) => {
          console.log('USER SIGNED IN');
          console.log('username ', username);
          localStorage.authtoken = response._kmd.authtoken;
          this.unset('password');
          this.trigger('change');
      },
       error: function(model, response) {
         console.log('ERROR: Login Failed');
      }
    });
  },
  signup: function() {},
  logout: function() {},
  retrieve: function() {},

});

export default SessionModel;
