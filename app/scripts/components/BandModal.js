import React from 'react';
import Transition from 'react-addons-css-transition-group';
import _ from 'underscore';

import store from '../store';


const BandModal = React.createClass({
  getInitialState: function() {
    return {
      loginMessage: false,
    }
  },
  hideModal: function (e) {
    if (_.toArray(e.target.classList).indexOf('modal-container') !== -1) {
      if (this.props.band._id) {
        store.votedCollection.toggleBandModal(this.props.band._id);
      } else {
        store.searchCollection.toggleBandModal(this.props.band.spotifyId);
      }
      e.stopPropagation();
    }
  },
  voteFunction: function () {
    if (localStorage.authtoken == store.anonToken) {
      this.setState({loginMessage: true});
      window.setTimeout(()=>{
        this.setState({loginMessage: false});
      }, 1000);
      console.log('YOU NEED TO LOG IN TO VOTE!');
    } else {
      let searchedband = store.searchCollection.get(this.props.band.spotifyId);
      console.log(this.props.band);
      store.votedCollection.voteToggle(this.props.band, store.session.get('username'));
    }
  },
  render: function() {
    let rank;
    let animations = '';
    let voteKeyWord;
    let voteMessage = 'vote';

    if (this.state.loginMessage) {
      console.log('loginMessage is true');
      animations = 'shake';
      voteMessage = 'login to vote!'
    }
    //order for these declarations MATTER
    let voteButton = (<button id={animations} className="vote-btn" onClick={this.voteFunction}>{voteMessage}</button>);

    const kinveyId = store.votedCollection.getKinveyId(this.props.band.spotifyId);

    if(kinveyId) {
      rank = store.votedCollection.get(kinveyId).get('voteRank');
      console.log(rank);

      if (store.votedCollection.get(kinveyId).get('allVoters').indexOf(store.session.get('username')) !== -1) {
        voteButton = (<button id={animations} className="vote-btn alreadyVoted" onClick={this.voteFunction}>You Voted!</button>);
      }
    }
    else {
      rank = 0;
    }

    if (rank === 1) {
      voteKeyWord = ' vote';
    } else {
      voteKeyWord = ' votes';
    }

    let styles = {backgroundImage: 'url(' + this.props.band.imageUrl + ')'};
    return (
      <div className="modal-container" onClick={this.hideModal}>
        <div className="bandModal-content">
          <h2 className="bandHeadings">{this.props.band.name}</h2>
          <data className="pop-data">Popularity <span className="highlight">{this.props.band.popularity}</span></data>
          <div className="modal-coverImg" style={styles}></div>
          <div className="band-info">
              <section className="voting-modal-footer spotify-section">
                <span className="highlight">{this.props.band.name} </span>
                <a href={this.props.band.spotify_url}><i className="fa fa-spotify" aria-hidden="true"></i></a>
                <p>on spotify</p>
              </section>

              <section className="voting-modal-footer voting-section">
                {voteButton}
              </section>

              <section className="voting-modal-footer voters-section">
                  <p className="voteTotal-section">{rank} {voteKeyWord}</p>
              </section>

          </div>
        </div>
      </div>
    )
  }
});

export default BandModal;
