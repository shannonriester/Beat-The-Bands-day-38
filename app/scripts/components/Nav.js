import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import SessionNav from './Controllers/SessionNav';

const Nav = React.createClass({
  navigateResults: function() {
    if (!sessionStorage.searchTerm) {
      hashHistory.push(`/`);
    } else {
      hashHistory.push(`/bands/search/${sessionStorage.searchTerm}`);
    }
  },
  navigateHome: function() {
    hashHistory.push(`/`);
  },
  navigateVotesPage: function() {
    hashHistory.push(`/allvotes`);
  },
  render: function() {
    return (
      <nav className="nav">
        <div className="nav-container">
          <button className="homeBtn navBtn" onClick={this.navigateHome}>
          <i className="icon fa fa-home" aria-hidden="true"></i>Home</button>
          <button className="searchBtn navBtn" onClick={this.navigateResults}><i className="icon fa fa-search" aria-hidden="true"></i>Search</button>
          <button className="votesBnt navBtn" onClick={this.navigateVotesPage}><i className="icon fa fa-thumbs-up" aria-hidden="true"></i>Votes</button>
        </div>
        <SessionNav />
        {//<UserSearBar />
        }
      </nav>
    );
  }
});

export default Nav;
