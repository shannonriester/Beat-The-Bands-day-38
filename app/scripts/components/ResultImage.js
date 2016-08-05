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
