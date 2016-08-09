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
    const kinveyId = store.votedCollection.getKinveyId(this.props.band.spotifyId);
    let bandModal;
    let voteKeyWord;
    let voteRank = 0;
    let votedStatus;
    let votedStyles;

    if (this.props.band.viewing) {
      bandModal = <BandModal band={this.props.band} hideBandModal={this.props.hideBandModal} />;
    }



    if(kinveyId) {
      voteRank = store.votedCollection.get(kinveyId).get('voteRank');
      if (store.votedCollection.get(kinveyId).get('allVoters').indexOf(store.session.get('username')) !== -1) {
        votedStatus = (<i className="alreadyVoted-icon fa fa-thumbs-up" aria-hidden="true"></i>);
        votedStyles = {
          background: 'rgba(#1DB954, .8)',
        }
      }
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
        {votedStatus}
        <section className="data-section">
          <h3 className="band-name">{this.props.band.name}</h3>
          <div className="votedInfo">
            <data style={votedStyles}>{voteRank} {voteKeyWord}</data>
          </div>
        </section>
        {bandModal}
      </li>
    );
  }
});

export default BandImage;
