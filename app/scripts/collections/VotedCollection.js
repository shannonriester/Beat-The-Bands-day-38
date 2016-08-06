import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import VoteModel from '../models/VoteModel';
import store from '../store';

const VotedCollection = Backbone.Collection.extend({
  model: VoteModel,
  url: `https://baas.kinvey.com/appdata/kid_Bk73T0yt/VotedCollection`,
  getKinveyId: function(spotifyId) {
    let kinveyId = this.models.reduce((returnSoFar, bandModel, i, arr) => {
      if (bandModel.attributes.spotifyId === spotifyId) {
        return bandModel.attributes._id;
      }
    }, '');
    return kinveyId;
  },
  unVoteFunction: function(votingBand){
    let newVoteRank = votingBand.get('voteRank') - 1;

    let newAllVoters = _.without(votingBand.get('allVoters'), store.session.get('username'));
    console.log(newAllVoters);

    votingBand.set('voteRank', newVoteRank);
    votingBand.set('allVoters', newAllVoters);

    votingBand.save(null, {
      success: (model, response) => {
        console.log('YOU UPDATED THE ALREADY-VOTED-FOR-BAND');
        this.trigger('update');
      },
      error: function(model, response) {
        throw new Error('FAILED TO VOTE');
      }
    });

  },
  addVoteFunction: function(votingBand){
    let newVoteRank = votingBand.get('voteRank') + 1;
    let userVoting = store.session.get('username');
    // let votersArr = this.get('allVoters');
    let newAllVoters = votingBand.get('allVoters').concat(userVoting);
    votingBand.set('voteRank', newVoteRank);
    votingBand.set('allVoters', newAllVoters);

    votingBand.save(null, {
      success: (model, response) => {
        console.log(model);
        // spotify_id: spotifyId,
        // name: votingBand.name,
        // allVotes: newVoteRank,
        // allVoters: newAllVoters
        console.log('YOU VOTED');
      },
      error: function(model, response) {
        throw new Error('FAILED TO VOTE');
      }
    });
  },
  createVoteModel: function(spotifyId){
    console.log(store.votedCollection.models);
    let band = store.searchCollection.get(spotifyId);

    let newAllVoters = [store.session.get('username')];
    let newVoteRank = band.get('voteRank') + 1;

    this.create({
      spotifyId: spotifyId,
      name: band.attributes.name,
      voteRank: newVoteRank,
      allVoters: newAllVoters
    },{
      success: (model, response) => {
      console.log('SUCCESS! YOU VOTED FOR: ', band.attributes.name);
      },
      error: function(model, response) {
        throw new Error('FAILED TO VOTE');
      }
   });
 },
  voteToggle: function(spotifyId) {
    let votedBand = this.models.reduce((returnSoFar, bandModel, i, arr) => {
      if (bandModel.attributes.spotifyId === spotifyId) {
        return bandModel;
      }
    }, false);

//FIRST IF-ELSE: IF there is a band in the VotedCollection...
    if (votedBand) {
        //if 'shannon' is in there...
      if (votedBand.get('allVoters').indexOf(store.session.get('username')) !== -1) {
        // console.log(votedBand.get('allVoters').indexOf(store.session.get('username'));
        console.log('YOU VOTED ON THIS ALREADY');
        this.unVoteFunction(votedBand);
      } else {
        //ELSE IF the user HASN'T VOTED on the band...save vote and update vote model
        this.addVoteFunction(votedBand);
      }
    } else {
      this.createVoteModel(spotifyId)
    }
  },
});

export default VotedCollection;

/*
VOTE

got to my server and fetch(taylor)
  if (taylorModel is there) {
  make set request and update her status
} else if she sint there {
  create a new model (on the collection) and then go from there
}

1. voteFor() {

  either this.save

  or this.create

}

*/
