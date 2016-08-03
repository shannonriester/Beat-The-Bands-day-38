import React from 'react';
import { Router, hashHistory } from 'react-router';

import store from '../store';

const Search = React.createClass({
  searchFunction: function(e) {
    e.preventDefault();
    let searchQuery = this.refs.searchInput.value;
    console.log(searchQuery);
    store.searchCollection.getResults(searchQuery);
    hashHistory.push('/bands');
  },
  render: function() {
    return (
      <form className="searchComponent" onSubmit={this.searchFunction}>
        <input id="search-bar" type="text" placeholder="search an artist..." ref="searchInput" />
        <input id="search-button" type="submit" value="search" onClick={this.searchFunction} />
      </form>
    );
  }
});

export default Search;
