import React from 'react';
import $ from 'jquery';

import store from '../../store';
import Search from '../Search';
import ResultImage from '../ResultImage';

const ResultsPage = React.createClass({
  getInitialState: function () {
    return {searchResults: store.searchCollection.toJSON()}
  },
  componentDidMount: function () {
    store.searchCollection.on('update change', () => {
      this.setState({searchResults: store.searchCollection.toJSON()});
    });
  },
  render: function () {
    console.log(this.state.searchResults);
    let searchResults;
    // if (this.state.searchResults[0]){
      searchResults = this.state.searchResults.map(function(band, i) {
        return <ResultImage key={i} band={band}/>
      });
    // }
    // $('.searchContainer').removeClass('landingPage');
    return (
      <div className="ResultsPage">
        {this.props.children}
        <Search />
        <h2>Your Search Results</h2>
          <ul>{searchResults}</ul>
      </div>
    );
  }
});

export default ResultsPage;
