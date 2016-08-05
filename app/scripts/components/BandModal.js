import React from 'react';
import _ from 'underscore';

import store from '../store';


const BandModal = React.createClass({
  hideModal: function (e) {
    if (_.toArray(e.target.classList).indexOf('modal-container') !== -1 || _.toArray(e.target.classList).indexOf('back-btn') !== -1) {
      store.searchCollection.get(this.props.band.id).set('viewing', false);
      e.stopPropagation();
      // let model = store.searchCollection.get(this.props.band.id);
      // store.bandModel.toggleBandModal(model);
    }
  },
  voteFunction: function () {
    store.voteModel.voteToggle(this.props.band);
  },
  render: function() {
    let clickable;
    if (localStorage.authtoken) {
      clickable = true;
    } else {
      clickable = false;
      //figure out how to shake button and send message to user
    }

    let imageUrl = this.props.band.imageUrl;
    let styles = {backgroundImage: 'url(' + imageUrl + ')'};
    return (
      <div className="modal-container" onClick={this.hideModal}>
        <div className="bandModal-content">
          <div className="modal-coverImg" style={styles}>
            <h2>{this.props.band.name}</h2>
            <section className="voting-section">
              <input className="vote-btn" type="button" value="vote" disabled={clickable} onClick={this.voteFunction} />
              <data className="votes-data">0</data>
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
