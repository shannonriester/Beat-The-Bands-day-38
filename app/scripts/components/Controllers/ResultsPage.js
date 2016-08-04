import React from 'react';
import $ from 'jquery';

import store from '../../store';
import Search from '../Search';
import ResultImage from '../ResultImage';

const ResultsPage = React.createClass({
  getInitialState: function () {
    return {
      searchResults: store.searchCollection.toJSON(),
      showBandModal: false,
    };
  },
  updateState: function () {
    this.setState({searchResults: store.searchCollection.toJSON()});
  },
  componentDidMount: function () {
    store.searchCollection.on('update change', this.updateState);
  },
  componentWillUnMount: function () {
    store.searchCollection.off('update', this.updateState);
  },
  showBandModal: function () {
    this.setState({showBandModal:true});
  },
  hideBandModal: function () {
    this.setState({showBandModal:false});
  },
  render: function () {

    let bandModal;
    let searchResults;

    searchResults = this.state.searchResults.map(function(band, i) {
      if (this.state.showBandModal) {
        bandModal = <BandModal showBandModal={this.showBandModal} hideBandModal={this.hideBandModal} />
      }

      return <ResultImage key={i} band={band}>{bandModal}</ResultImage>
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
