import React from 'react';

import store from '../store';
import BandModal from './BandModal';

const ResultImage = React.createClass({
  viewBand: function (e) {
    // console.log('this.props ', this.props);
    this.props.showBandModal(this.props.band.id);
  },
  render: function () {
    console.log(this.props.modalState);
    let bandModal;
    if (this.props.modalState) {
      bandModal = <BandModal band={this.props.band} hideBandModal={this.hideBandModal} />;
    }

    let imageUrl = this.props.band.imageUrl;
    let styles = {
    backgroundImage: 'url(' + imageUrl + ')',
    }

    return (
      <li className="band-result" onClick={this.viewBand}>
        <div className="coverImg" style={styles}></div>
        <p className="band-name">{this.props.band.name}</p>
        <data className="popularity">{this.props.band.popularity}</data>
        <data className="followers">{this.props.band.followers}</data>
        <a className="spotifyUrl">{this.props.band.spotify_url}</a>

        {bandModal}
      </li>
    );
  }
});

export default ResultImage;
