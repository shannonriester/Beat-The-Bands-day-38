import React from 'react';

import store from '../store';
import BandModal from './BandModal';

const VoteImage = React.createClass({
  viewBand: function (e) {
    console.log(this.props);
    store.votedCollection.get(this.props.band._id).set('viewing', true);
  },
  render: function () {
    // console.log(this.props);
    let bandModal;
    if (this.props.band.viewing) {
      bandModal = <BandModal band={this.props.band} hideBandModal={this.props.hideBandModal} />;
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

export default VoteImage;
