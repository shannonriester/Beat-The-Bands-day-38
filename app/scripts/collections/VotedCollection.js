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
    console.log(newAllVoters);

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
    // console.log();
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
    console.log(store.votedCollection.models);
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
        console.log('bandModel ', bandModel);
        return bandModel;
      }
    });
//FIRST IF-ELSE: IF there is a band in the VotedCollection...
  console.log(votedBand);
    if (votedBand[0]) {
      console.log('SOMEONE voted on this');
        //if 'shannon' is in there...
        let allVotersArr = votedBand[0].get('allVoters');
        let newAllVotersTruth = allVotersArr.indexOf(store.session.get('username'));
        console.log(allVotersArr);
        console.log(newAllVotersTruth);

      if (votedBand[0].get('allVoters').indexOf(store.session.get('username')) !== -1) {
        // console.log(votedBand.get('allVoters').indexOf(store.session.get('username'));
        console.log('YOU VOTED ON THIS ALREADY');
        this.unVoteFunction(votedBand[0]);
      } else {
        //ELSE IF the user HASN'T VOTED on the band...save vote and update vote model
        this.addVoteFunction(votedBand[0]);
      }
    } else {
      // this.createVoteModel(spotifyId)
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
