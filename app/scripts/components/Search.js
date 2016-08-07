import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import store from '../store';

const Search = React.createClass({
  getInitialState: function() {
    return {shakeModal: false,}
  },
  searchFunction: function(e) {
    e.preventDefault();
    let searchQuery = this.refs.searchInput.value;
    if (searchQuery === '' || searchQuery === ' '|| searchQuery === '  ') {
      this.setState({shakeModal: true});
      window.setTimeout(()=>{
        this.setState({shakeModal: false});
      }, 500);
      console.log('YOU NEED TO SEARCH SOMETHING!');
    } else {
      store.searchCollection.getResults(searchQuery);
      hashHistory.push(`/bands/search/${searchQuery}`);
      sessionStorage.searchTerm = searchQuery;
    }
  },
  render: function() {
    let animations = '';
    if (this.state.shakeModal) {
      animations = 'shake';
    }
    return (
      <form id={animations} className="searchComponent" onSubmit={this.searchFunction} >
        <input className="search-bar" type="text" placeholder="search an artist..." ref="searchInput"  />
        <input className="search-button" type="submit" value="search" onClick={this.searchFunction} />
      </form>
    );
  }
});

export default Search;
