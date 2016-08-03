import Backbone from 'backbone';

const SessionModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/user/kid_rkjTLZY_/login`,
  defaults: {
    username: '',
    votes: '',
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
      {
        success: (model, response) => {
          console.log('USER SIGNED IN');
          console.log('username', username);
          localStorage.authtoken = response._kmd.authtoken;
          this.unset(password);
          this.trigger('change');
      },
      {
        error: function(model, response) {
          console.log('ERROR: FAILED TO LOGIN');
        }
      },

    });
  },
  signup: function() {},
  logout: function() {},
  retrieve: function() {},

});

export default SessionModel;
