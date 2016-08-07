import Backbone from 'backbone';

import store from '../store';

const SessionModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/user/kid_Bk73T0yt/login`,
  defaults: {
    username: '',
    votedBands: [],
    isLoggingIn: false,
    isSigningUp: false,
    shakeModal: false,
  },
  getLocation: function() {
    var promise = new Promise(function(resolve, reject) {
      if ('geolocation' in navigator) {
        window.navigator.geolocation.getCurrentPosition(function(position){
          //result in SessionNav.js
          // console.log(position);
        });
      } else {
        reject('This browser doesn\'t support geolocation...');
      }
    });
    return promise;
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
          console.log('USER SIGNED IN', username);

          localStorage.authtoken = response._kmd.authtoken;
          this.unset('password');
          this.trigger('change');
      },
       error: function(model, response) {
         throw new Error('LOGIN FAILED');
      }
    });
  },
  signup: function(username, password) {
    this.save({
      username: username,
      password: password,
    },
    {
      url: `https://baas.kinvey.com/user/kid_Bk73T0yt/`,
      success: (model, response) => {
        console.log('USER SIGNED UP!', username);
        localStorage.authtoken = response._kmd.authtoken;
        // this.set('authtoken', response._kmd.authtoken);
        this.unset('password');
      },
      error: function(model, response) {
        throw new Error('FAILED TO SIGN UP');
      }
    });
  },
  logout: function(){
    this.set('isLoggingIn', false);
    this.set('isSigningUp', false);
    localStorage.removeItem('authtoken');
    this.clear();
    console.log('USER LOGGED OUT!');

  },
  retrieve: function() {
    this.fetch({
      url: `https://baas.kinvey.com/user/kid_Bk73T0yt/_me`,
      success: () => {
          console.log('User Retrieved: ', this);
      },
      error: function(response) {
        throw new Error('COULD NOT FETCH USER!')
      }
    });
  },

});

export default SessionModel;
