import React from 'react';

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
    store.searchedCollection.off('update change', this.updateState);
  },
  render: function () {
    let votedBands;
    votedBands = this.state.votedCollection.map((votedBand, i) => {
      return (<VoteImage key={i} band={votedBand} />);
    });
    return (
      <div className="votesPage-container">
        <Header />
        {this.props.children}
        <Search />
        <h2>Highest Ranked Artists</h2>
        <ul>{votedBands}</ul>
      </div>
    );
  }
});

export default VotesPage;
