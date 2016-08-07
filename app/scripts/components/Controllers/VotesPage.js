import React from 'react';
import _ from 'underscore';

import store from '../../store';
import Search from '../Search';
import Header from '../Header';
import VoteImage from '../VoteImage';

const VotesPage = React.createClass({
  getInitialState: function () {
    return {
      votedCollection: store.votedCollection.toJSON(),
    };
  },
  updateState: function () {
    this.setState({votedCollection: store.votedCollection.toJSON()});
  },
  componentDidMount: function () {
    store.votedCollection.fetch();
    store.votedCollection.on('update', this.updateState);
    store.votedCollection.on('change', this.updateState);
  },
  componentWillUnmount: function () {
    store.votedCollection.off('update change', this.updateState);
  },
  render: function () {

    let sortedBands = _.sortBy(this.state.votedCollection, (votedBand) => votedBand.voteRank);
    sortedBands.reverse();

    let votedbands;

    votedbands = sortedBands.map((votedBand, i) => {
      return (<VoteImage key={i} band={votedBand} />);
    });
    return (
      <div className="votesPage page-container">
        <Header />
        {this.props.children}
        <Search />
        <h2>Highest Ranked Artists</h2>
        <ul>{votedbands}</ul>
      </div>
    );
  }
});

export default VotesPage;
