import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import App from './components/App';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import ResultsPage from './components/ResultsPage';


const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage}/>
      <Route path="/bands" component={ResultsPage}>
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
