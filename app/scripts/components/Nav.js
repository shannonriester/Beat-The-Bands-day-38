import React from 'react';

import SessionNav from './Controllers/SessionNav';

const Nav = React.createClass({

  render: function() {
    return (
      <nav className="nav">
        <input className="homeBtn navBtn" type="button" value="home" ref="homeBtn" />
        <input className="votesBnt navBtn" type="button" value="votes" ref="votesBtn" />
        <SessionNav />
      </nav>
    );
  }
});

export default Nav;
