import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import store from '../store';

const Search = React.createClass({

  searchFunction: function(e) {
    e.preventDefault();
    let searchQuery = this.refs.searchInput.value;
    if (searchQuery === '' || searchQuery === ' ') {
      //figure out how to shake the searchbar
      console.log('YOU NEED TO SEARCH SOMETHING!');
    } else {
      store.searchCollection.getResults(searchQuery);
      hashHistory.push('/bands/search');
    }
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
