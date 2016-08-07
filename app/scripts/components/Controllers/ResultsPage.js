import React from 'react';
import $ from 'jquery';

import store from '../../store';
import Search from '../Search';
import Header from '../Header';
import ResultImage from '../ResultImage';
import BandModal from '../BandModal';

const ResultsPage = React.createClass({
  getInitialState: function () {
    return {
      searchResults: store.searchCollection.toJSON(),
      votedCollection: store.votedCollection.toJSON(),
      alreadyVoted: false,
    };
  },
  updateState: function () {
    this.setState({searchResults: store.searchCollection.toJSON()});
    this.setState({votedCollection: store.votedCollection.toJSON()});
  },
  componentDidMount: function () {
    store.searchCollection.getResults(this.props.params.search);
    store.searchCollection.on('update change', this.updateState);

    store.votedCollection.fetch();
    store.votedCollection.on('update change', this.updateState);
  },
  componentWillUnmount: function () {
    store.searchCollection.off('update change', this.updateState);
    store.votedCollection.off('update change', this.updateState);
  },
  render: function () {
    let searchResults;
    searchResults = this.state.searchResults.map((band, i) => {
      return (<ResultImage key={band.id} band={band} />);
    });
    let userSearch = this.props.routeParams.search;
    return (
      <div className="resultsPage page-container">
        <Header userSearch={userSearch} />
        {this.props.children}
        <Search />
          <ul>{searchResults}</ul>
      </div>
    );
  }
});

export default ResultsPage;
