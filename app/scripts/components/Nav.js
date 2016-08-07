import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import SessionNav from './Controllers/SessionNav';

const Nav = React.createClass({
  navigateResults: function() {
    console.log(this.props.userSearch);
    hashHistory.push(`/bands/search/${sessionStorage.searchTerm}`);
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
          <input className="homeBtn navBtn" type="button" value="home" onClick={this.navigateHome} />
          <input className="searchBtn navBtn" type="button" value="results" onClick={this.navigateResults} />
          <input className="votesBnt navBtn" type="button" value="votes" onClick={this.navigateVotesPage}/>
        </div>
        <SessionNav />
        {//<UserSearBar />
        }
      </nav>
    );
  }
});

export default Nav;
