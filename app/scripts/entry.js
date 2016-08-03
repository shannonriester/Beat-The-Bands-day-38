import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

const router = (
  <Route path="/" component={App}>
    <IndexRoute component={SearchPage}/>
    <Route path="/bands" component={PageWHeader}>
      <IndexRoute onEnter={change route somehow}
      <Route path="/bands/search" comoponent={Results}/>
      <Route path="/bands/votes" comoponent={AllVotes}/>
      <Redirect from="/bands" to="/" />
    </Route>
  </Route>
);



ReactDOM.render(router, document.getElementById('container'));
