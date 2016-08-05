import React from 'react';
import $ from 'jquery';

import store from '../../store';
import Search from '../Search';
import ResultImage from '../ResultImage';
import BandModal from '../BandModal';

const ResultsPage = React.createClass({
  getInitialState: function () {
    return {
      searchResults: store.searchCollection.toJSON(),
    };
  },
  updateState: function () {
    this.setState({searchResults: store.searchCollection.toJSON()});
  },
  componentDidMount: function () {
    store.searchCollection.getResults(this.props.params.search);
    store.searchCollection.on('update change', this.updateState);
  },
  componentWillUnMount: function () {
    store.searchCollection.off('update change', this.updateState);
  },
  render: function () {
    let searchResults;
    searchResults = this.state.searchResults.map((band, i) => {
      return (<ResultImage key={band.id} band={band} />);
    });

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
