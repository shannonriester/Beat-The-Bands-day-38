import React from 'react';
import _ from 'underscore';

import store from '../../store';
import Search from '../Search';
import Header from '../Header';
import BandImage from '../BandImage';

const VotesPage = React.createClass({
  getInitialState: function () {
    return {
      votedCollection: store.votedCollection.toJSON(),
    };
  },
  updateState: function () {
    this.setState({votedCollection: store.votedCollection.toJSON()});
  },
  shouldComponentUpdate: function(props, state) {
    if (store.session.get('authtoken') && !state.votedCollection.length) {
      store.votedCollection.fetch();
    }
    return true;
  },
  componentDidMount: function () {
    store.session.on('change update', this.updateState);
    store.votedCollection.fetch();
    store.votedCollection.on('change update', this.updateState);
  },
  componentWillUnmount: function () {
    store.votedCollection.off('update change', this.updateState);
    store.session.off('change update', this.updateState);
  },
  render: function () {
    let sortedBands = _.sortBy(this.state.votedCollection, (votedBand) => votedBand.voteRank);
    sortedBands.reverse();

    let votedbands;
    votedbands = sortedBands.map((votedBand, i) => {
      return (<BandImage key={votedBand._id} band={votedBand} />);
    });
    return (
      <div className="votesPage page-container">
        <Header />
        {this.props.children}
        <Search />
        <h2>Top Voted Artists</h2>
        <ul>{votedbands}</ul>
      </div>
    );
  }
});

export default VotesPage;
