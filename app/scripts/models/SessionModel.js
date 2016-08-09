import Backbone from 'backbone';

// import store from '../store';

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
          // localStorage.authtoken = response._kmd.authtoken;
          localStorage.removeItem('authtoken');
          console.log('authtoken ', localStorage.authtoken);
          // this.set('authtoken', response._kmd.authtoken);
          localStorage.setItem('authtoken', response._kmd.authtoken);
          console.log('authtoken ', localStorage.authtoken);
          console.log(localStorage.setItem('authtoken', response._kmd.authtoken));
          this.unset('password');
          this.trigger('change update');
          console.log(response._kmd.authtoken);

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
        this.unset('password');
      },
      error: function(model, response) {
        throw new Error('FAILED TO SIGN UP');
      }
    });
  },
  logout: function(){
    this.save(null,
      { url: `https://baas.kinvey.com/user/kid_Bk73T0yt/_logout`,
        success: (model, response) => {
          console.log('USER LOGGED OUT!');
          this.set('isLoggingIn', false);
          this.set('isSigningUp', false);
          localStorage.removeItem('authtoken');
          localStorage.authtoken = 'afe43b20-9499-48f1-a1f7-7ffa9d8b99d4.dDsyxSzL3cOFa0ctR35XC5yHVsCN2Sh5551M/a+SibQ=';
          sessionStorage.removeItem('searchTerm');
          this.clear();
          this.trigger('change update');
      },
       error: function(model, response) {
         throw new Error('LOGIN FAILED');
      }
    });
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
