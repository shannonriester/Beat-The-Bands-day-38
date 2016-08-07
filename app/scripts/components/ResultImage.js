import React from 'react';

import store from '../store';
import BandModal from './BandModal';

const ResultImage = React.createClass({
  viewBand: function (e) {
    store.searchCollection.get(this.props.band.id).set('viewing', true);
  },
  render: function () {
    let bandModal;
    if (this.props.band.viewing) {
      bandModal = <BandModal band={this.props.band} hideBandModal={this.props.hideBandModal} />;
    }

    let voteButton;
    if (store.votedCollection.get('allVoters')) {
      
    }

    let imageUrl = this.props.band.imageUrl;
    let styles = {
    backgroundImage: 'url(' + imageUrl + ')',
    }
    return (
      <li className="li-band" onClick={this.viewBand} style={styles}>
        <section className="data-section">
          <h3 className="band-name">{this.props.band.name}</h3>
          <a href={this.props.band.spotify_url} className="spotifyUrl"><i className="fa fa-spotify" aria-hidden="true"></i></a>
        </section>
        {bandModal}
      </li>
    );
  }
});

export default ResultImage;
