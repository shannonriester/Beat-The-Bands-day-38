import React from 'react';

import store from '../store';
import BandModal from './BandModal';

const BandImage = React.createClass({
  viewBand: function (e) {
    if (this.props.band._id) {
      store.votedCollection.get(this.props.band._id).set('viewing', true);
    } else {
      store.searchCollection.get(this.props.band.spotifyId).set('viewing', true);
    }
  },
  render: function () {
    let bandModal;
    if (this.props.band.viewing) {
      bandModal = <BandModal band={this.props.band} hideBandModal={this.props.hideBandModal} />;
    }

    let voteRank;
    let voteKeyWord;
    const kinveyId = store.votedCollection.getKinveyId(this.props.band.spotifyId);
    if(kinveyId) {
      voteRank = store.votedCollection.get(kinveyId).get('voteRank');
      if (voteRank === 1) {
        voteKeyWord = 'vote';
      } else {
        voteKeyWord = 'votes';
      }
    }

    // <a href={this.props.band.spotify_url} className="spotifyUrl"><i className="fa fa-spotify" aria-hidden="true"></i></a>
    let imageUrl = this.props.band.imageUrl;
    let styles = {
    backgroundImage: 'url(' + imageUrl + ')',
    }
    return (
      <li className="li-band" onClick={this.viewBand} style={styles}>
        <section className="data-section">
          <h3 className="band-name">{this.props.band.name}</h3>
          <div className='votesPreview'>{voteRank} {voteKeyWord}</div>
        </section>
        {bandModal}
      </li>
    );
  }
});

export default BandImage;
