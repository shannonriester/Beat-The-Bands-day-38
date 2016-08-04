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
      modalState: null,
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
  showBandModal: function (id) {
    this.setState({modalState:id});
  },
  hideBandModal: function () {
    this.setState({modalState:null});
  },
  render: function () {
    // console.log(this.state.showBandModal);
    // if (this.state.showBandModal) {
    //   console.log(store.searchCollection.get(this.state.showBandModal));
    // }

    let searchResults;
    searchResults = this.state.searchResults.map((band, i) => {


      return (<ResultImage key={i} band={band} modalState={this.state.modalState===band.id} showBandModal={this.showBandModal}/>);
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
