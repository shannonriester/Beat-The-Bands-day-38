import React from 'react';

import store from '../../store';
import Search from '../Search';
import Header from '../Header';

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
    store.votedCollection.on('update change', this.updateState);
  },
  componentWillUnMount: function () {
    store.votedCollection.off('update change', this.updateState);
  },
  render: function () {
    let votedBands;
    votedBands = this.state.votedCollection.map((band, i) => {
      return (<ResultImage key={band.id} band={band} />);
    });
    return (
      <div className="votesPage-container">
        <Header />
        {this.props.children}
        <Search />
        <h2>Highest Ranked Artists</h2>
        <ul>{}</ul>
      </div>
    );
  }
});

export default VotesPage;
