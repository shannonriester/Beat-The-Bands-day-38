import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import VoteModel from '../models/VoteModel';
import store from '../store';

const VotedCollection = Backbone.Collection.extend({
  model: VoteModel,
  url: `https://baas.kinvey.com/appdata/kid_Bk73T0yt/VotedCollection`,
  getKinveyId: function(spotifyId) {
    let kinveyId;
    this.models.forEach((bandModel, i, arr) => {
      if (bandModel.get('spotifyId') === spotifyId) {
        kinveyId = bandModel.get('_id');
      }
    });
    return kinveyId;
  },
  unVoteFunction: function(votingBand){
    let newVoteRank = votingBand.get('voteRank') - 1;
    let newAllVoters = _.without(votingBand.get('allVoters'), store.session.get('username'));

    votingBand.set('voteRank', newVoteRank);
    votingBand.set('allVoters', newAllVoters);

    votingBand.save(null, {
      success: (model, response) => {
        console.log('YOU UPDATED THE ALREADY-VOTED-FOR-BAND');
        if (model.get('voteRank') === 0) {
          model.destroy();
          console.log('DESTORYED' + model.attributes.name + 'BECAUSE HE WAS AT ZERO VOTES');
        }
        this.trigger('update');
      },
      error: function(model, response) {
        throw new Error('FAILED TO VOTE');
      }
    });

  },
  addVoteFunction: function(votingBand){
    let newVoteRank = votingBand.get('voteRank') + 1;
    let newAllVoters = votingBand.get('allVoters').concat(store.session.get('username'));
    votingBand.set('voteRank', newVoteRank);
    votingBand.set('allVoters', newAllVoters);
    votingBand.save(null, {
      success: (model, response) => {
        console.log(model.get('voteRank'));
        console.log(model);
        console.log('YOU VOTED');
      },
      error: function(model, response) {
        throw new Error('FAILED TO VOTE');
      }
    });
  },
  createVoteModel: function(spotifyId){
    let band = store.searchCollection.get(spotifyId);

    let newAllVoters = [store.session.get('username')];
    let newVoteRank = 1;

    this.create({
      spotifyId: spotifyId,
      name: band.attributes.name,
      spotify_url: band.attributes.spotify_url,
      imageUrl: band.attributes.imageUrl,
      popularity: band.attributes.popularity,
      voteRank: newVoteRank,
      allVoters: newAllVoters
    },{
      success: (model, response) => {
      console.log(model);
      console.log('SUCCESS! YOU VOTED FOR: ', band.attributes.name);
      },
      error: function(model, response) {
        throw new Error('FAILED TO VOTE');
      }
   });
 },
  voteToggle: function(spotifyId) {
    let votedBand = this.models.filter((bandModel, i, arr) => {
      if (bandModel.get('spotifyId') === spotifyId) {
        return bandModel;
      }
    });
//FIRST IF-ELSE: IF there is a band in the VotedCollection...
    if (votedBand[0]) {
        //if 'sessionUsername' is in there...
        let allVotersArr = votedBand[0].get('allVoters');
        let newAllVotersTruth = allVotersArr.indexOf(store.session.get('username'));

      if (votedBand[0].get('allVoters').indexOf(store.session.get('username')) !== -1) {
        console.log('YOU VOTED ON THIS ALREADY');
        this.unVoteFunction(votedBand[0]);
      } else {
        //ELSE IF the user HASN'T VOTED on the band...save vote and update vote model
        this.addVoteFunction(votedBand[0]);
      }
    } else {
      this.createVoteModel(spotifyId)
    }
  },
  toggleBandModal: function (id) {
    console.log('id on searchCollection ', id);
    if (id) {
      if (!this.get(id).get('viewing')) {
        this.get(id).set('viewing', true);
      } else {
        this.get(id).set('viewing', false);
      }
    } else {
      this.set('viewing', false);
    }
  }
});

export default VotedCollection;
