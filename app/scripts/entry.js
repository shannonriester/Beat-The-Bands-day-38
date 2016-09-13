import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import $ from 'jquery';

import store from './store';
import App from './components/App';
import Header from './components/Header';
import LandingPage from './components/Controllers/LandingPage';
import ResultsPage from './components/Controllers/ResultsPage';
import VotesPage from './components/Controllers/VotesPage';

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage}/>
      <Route path="/bands/search/:search" component={ResultsPage} />
      <Route path="allvotes" component={VotesPage}/>
      {//<Route path="/home" comoponent={SessionProfile}/>
      //<Route path="/user/:id" comoponent={UserPage, UserVotesPage}/>
      }
    </Route>
  </Router>
);

$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('spotify') === -1) {
    if (localStorage.authtoken) {
      if (localStorage.authtoken === store.anonToken && jqueryAjax.url.indexOf('user') !== -1) {
        xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`);
      } else {
        xhrAjax.setRequestHeader('Authorization', `Kinvey ${localStorage.authtoken}`);
      }
    } else {
      xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`);
    }
  }
});

if (localStorage.getItem('authtoken') && localStorage.authtoken !== store.anonToken) {
  store.session.retrieve();
}
else if (!localStorage.authtoken) {
  console.log(store.anonToken);
  localStorage.authtoken = store.anonToken;
  localStorage.setItem(store.anonToken);
}


ReactDOM.render(router, document.getElementById('container'));

// const Checkbox = React.createClass({
//   getInitialState: function() {
//     return {checked: false,}
//   },
//   checkHandler: function(e) {
//     if (!e.which || e.which === 13) {
//       this.setState({checked: !this.state.checked});
//     }
//   },
//   render: function() {
//     let checker;
//     let message = '"check" me out ;)!';
//     if (this.state.checked) {
//       checker = (<div className="checkbox-inner"></div>);
//       message = 'hey! you checked me out!!'
//     }
//     return (
//       <div className="daddy-container">
//         <label htmlFor="checkbox1">{message}</label>
//         <div id="checkbox1" tabIndex="0" className="checkbox-container" role="checkbox" onClick={this.checkHandler} onKeyUp={this.checkHandler}>
//           {checker}
//         </div>
//       </div>
//     );
//   }
// });
//

//
// ReactDOM.render(<Checkbox />, document.getElementById('container'));
