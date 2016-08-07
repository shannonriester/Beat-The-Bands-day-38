import React from 'react';
import _ from 'underscore';

import store from '../store';


const BandModal = React.createClass({
  hideModal: function (e) {
    if (_.toArray(e.target.classList).indexOf('modal-container') !== -1 || _.toArray(e.target.classList).indexOf('back-btn') !== -1) {

      store.searchCollection.toggleBandModal(this.props.band.id);
      e.stopPropagation();
    }
  },
  voteFunction: function () {
    if (!localStorage.authtoken) {
      //figure out how to shake button and send message to user
      console.log('YOU NEED TO LOG IN TO VOTE!');
    } else {
      store.votedCollection.voteToggle(this.props.band.id);
    }
  },
  render: function() {
    let rank;
    console.log();
    const kinveyId = store.votedCollection.getKinveyId(this.props.band.id);
    if(kinveyId) {
      rank = store.votedCollection.get(kinveyId).get('voteRank');
    } else {
      rank = 0;
    }

    let imageUrl = this.props.band.imageUrl;
    let styles = {backgroundImage: 'url(' + imageUrl + ')'};
    return (
      <div className="modal-container" onClick={this.hideModal}>
        <div className="bandModal-content">
          <div className="modal-coverImg" style={styles}>
            <h2>{this.props.band.name}</h2>
            <section className="voting-section">
              <input className="vote-btn" type="button" value="vote" onClick={this.voteFunction} />
              <data className="votes-data">Votes: {rank}</data>
            </section>
          </div>
          <data className="pop-data">{this.props.band.popularity}</data>
          <p className="spotify-link">Check out <a href={this.props.band.spotify_url}>{this.props.band.name}</a> on Spotify</p>
          <input className="back-btn" type="button" value="back" onClick={this.hideModal} />

        </div>
      </div>
    )
  }
});

export default BandModal;