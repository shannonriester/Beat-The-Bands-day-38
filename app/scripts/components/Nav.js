import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import SessionNav from './Controllers/SessionNav';

const Nav = React.createClass({
  navigateResults: function() {
    hashHistory.push(`/bands/search/${searchQuery}`);
  },
  navigateVotesPage: function() {
    hashHistory.push(`/allvotes`);
  },
  render: function() {
    return (
      <nav className="nav">
        <input className="homeBtn navBtn" type="button" value="home" ref="homeBtn" onClick={this.navigateResults} />
        <input className="votesBnt navBtn" type="button" value="votes" ref="votesBtn" onClick={this.navigateVotesPage}/>
        <SessionNav />
        {//<UserSearBar />
        }
      </nav>
    );
  }
});

export default Nav;
