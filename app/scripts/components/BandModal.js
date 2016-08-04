import React from 'react';

import store from '../store';


const BandModal = React.createClass({
  hideModal: function (e) {
    e.stopPropagation();
    // let model = store.searchCollection.get(this.props.band.id);
    // store.bandModel.toggleBandModal(model);
    store.searchCollection.get(this.props.band.id).set('viewing', false);

  },
  voteFunction: function () {
    if (store.session.get('authtoken')) {
      store.voteModel.voteToggle(this.props.band);
    } else {
      // this.refs.voteBtn.disabeled = true;
      console.log('YOU MUST BE LOGGED IN TO VOTE!');
    }
  },
  render: function() {

    let imageUrl = this.props.band.imageUrl;
    let styles = {backgroundImage: 'url(' + imageUrl + ')'};
    return (
      <div className="modal-container">
        <div className="bandModal-content">
          <div className="modal-coverImg" style={styles}>
            <h2>{this.props.band.name}</h2>
            <section className="voting-section">
              <input className="vote-btn" type="button" value="vote" onClick={this.voteFunction} ref="voteBtn"/>
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
