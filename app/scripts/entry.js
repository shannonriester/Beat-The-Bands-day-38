import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import $ from 'jquery';

import store from './store';
import LandingPage from './components/Controllers/LandingPage';
import ResultsPage from './components/Controllers/ResultsPage';
import App from './components/App';
import Header from './components/Header';


const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage}/>
      <Route path="/bands/search" component={ResultsPage}>
        <IndexRoute component={Header}/>
        {//
        // <Route path="/bands/search" comoponent={Results}/>
        // <Route path="/bands/votes" comoponent={AllVotes}/>
      }
      </Route>
    </Route>
  </Router>
);

// const router = (
//   <Route path="/" component={App}>
//     <IndexRoute component={SearchPage}/>
//     <Route path="/bands" component={PageWHeader}>
//       <IndexRoute onEnter={change route somehow}
      // <Route path="/bands/search" comoponent={Results}/>
      // <Route path="/bands/votes" comoponent={AllVotes}/>
//       <Redirect from="/bands" to="/" />
//     </Route>
//   </Route>
// );



ReactDOM.render(router, document.getElementById('container'));


$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('spotify') === -1) {
    if (localStorage.authtoken) {
      xhrAjax.setRequestHeader('Authorization', `Kinvey ${localStorage.authtoken}`);
    } else {
      xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`);
    }
  }
});
if (localStorage.authtoken) {
  store.session.retrieve();
}
