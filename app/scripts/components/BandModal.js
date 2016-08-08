import React from 'react';
import _ from 'underscore';

import store from '../store';


const BandModal = React.createClass({
  hideModal: function (e) {
    if (_.toArray(e.target.classList).indexOf('modal-container') !== -1 || _.toArray(e.target.classList).indexOf('back-btn') !== -1) {
      if (this.props.band.id) {
        store.searchCollection.toggleBandModal(this.props.band.id);
      } else {
        store.votedCollection.toggleBandModal(this.props.band._id);
      }
      e.stopPropagation();
    }
  },
  voteFunction: function () {
    if (!localStorage.authtoken) {

      console.log('YOU NEED TO LOG IN TO VOTE!');
    } else {
      store.votedCollection.voteToggle(this.props.band.id);
    }
  },
  render: function() {
    let rank;
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
          <h2 className="bandHeadings">{this.props.band.name}</h2>
          <data className="pop-data">Popularity <span className="highlight">{this.props.band.popularity}</span></data>
          <div className="modal-coverImg" style={styles}>
            <p className="spotify-link"><span className="highlight">{this.props.band.name}</span>Spotify <a href={this.props.band.spotify_url}><i className="fa fa-spotify" aria-hidden="true"></i></a></p>
          </div>
          <div className="band-info">
            <section className="voting-section">
              <input className="vote-btn" type="button" value="vote" onClick={this.voteFunction} />
              <data className="votes-data">Votes: {rank}</data>
            </section>
            </div>
        </div>
      </div>
    )
  }
});

export default BandModal;
