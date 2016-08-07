import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import SessionNav from './Controllers/SessionNav';

const Nav = React.createClass({
  navigateResults: function() {
    console.log(this.props.userSearch);
    hashHistory.push(`/bands/search/${sessionStorage.searchTerm}`);
  },
  navigateVotesPage: function() {
    hashHistory.push(`/allvotes`);
  },
  render: function() {
    return (
      <nav className="nav">
        <input className="homeBtn navBtn" type="button" value="search" onClick={this.navigateResults} />
        <input className="votesBnt navBtn" type="button" value="votes" onClick={this.navigateVotesPage}/>
        <SessionNav />
        {//<UserSearBar />
        }
      </nav>
    );
  }
});

export default Nav;
