import Backbone from 'backbone';
import $ from 'jquery';

import VoteModel from '../models/VoteModel';
import store from '../store';

const VotedCollection = Backbone.Collection.extend({
  model: VoteModel,
  url: `https://baas.kinvey.com/appdata/kid_Bk73T0yt/VotedCollection`,
  voteToggle: function(spotifyId) {
    let votingBand = this.get(spotifyId);

//FIRST IF-ELSE: IF there is a band in the VotedCollection...
    if (votingBand) {
      let didVote = this.get('allVoters').filter(function(voter, i){
        console.log(voter);
        return voter;
      });
      //IF the user has voted for the band in the VotedCollection...
        //1. EITHER: toggle their vote off and have them un-vote
        //2. OR: toggle their vote ON and have them VOTE
      if (store.session.get('username') === didVote) {
        //UNVOTE and update vote
        let newVoteRank = this.get('voteRank') - 1;
        let userUnVoting = store.session.get('username');
        let newAllVoters = _.without(this.get('allVoters'), userUnVoting);
        votingBand.set('voteRank', newVoteRank);

        votingBand.save(null, {
          success: (model, response) => {
            console.log(model);
            spotify_id: spotifyId,
            // name: votingBand.name,
            // allVotes: newVoteRank,
            // allVoters: newAllVoters
            console.log('YOU UPDATED THE ALREADY-VOTED-FOR-BAND');
          },
          error: function(model, response) {
            throw new Error('FAILED TO VOTE');
          }
        });

      } else if (!store.session.get('username') === didVote) {
        //ELSE IF the user HASN'T VOTED on the band...save vote and update vote model
        let newVoteRank = this.get('voteRank') + 1;
        let userVoting = store.session.get('username');
        // let votersArr = this.get('allVoters');
        let newAllVoters = this.get('allVoters').concat(userVoting);
        votingBand.set('voteRank', newVoteRank);

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
      }
// SECOND PART OF MAIN IF-ELSE:

    } else {
      let band = store.searchCollection.get(spotifyId);
      // console.log('newVoteRank ', newVoteRank);
      let userVoting = store.session.get('username');
      // let newAllVoters = this.get('allVoters').concat(userVoting);
      let newAllVoters = band.get('allVoters').concat(userVoting);
      band.set('allVoters', newAllVoters);
      let newVoteRank = band.get('voteRank') + 1;
      band.set('voteRank', newVoteRank);


      console.log(spotifyId);
       this.create({
         spotifyId: spotifyId,
         band: band,
         name: band.attributes.name,
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
    }

  },



    // let votedBand = store.searchCollection.get(id);

    // if (store.session.get('username') === didVote) {
      // let newVoteRank = this.get('voteRank') - 1;
      // console.log('newVoteRank ', newVoteRank);
      // let userUnVoting = store.session.get('username');
      // console.log('userUnVoting ', userUnVoting);
      // let newAllVoters = _.without(this.get('allVoters'), userUnVoting);
      // //have the searchedBandModel reflect the same rank:
      // votedBand.set('voteRank', newVoteRank);

    //   this.save({
    //     spotify_id: id,
    //     band: votedBand,
    //     name: votedBand.name,
    //     allVotes: newVoteRank,
    //     allVoters: newAllVoters
    //   },{
    //     success: (model, response) => {
    //       console.log('SUCCESS! YOU VOTED FOR: ', votedBand.name);
    //     },
    //     error: function(model, response) {
    //       throw new Error('FAILED TO VOTE');
    //    }
    //   });
    // } else {
    //   let newVoteRank = this.get('voteRank') + 1;
    //   let userVoting = store.session.get('username');
    //   let votersArr = this.get('allVoters');
    //
    //   let newAllVoters = this.get('allVoters').concat(userVoting);
    //   // console.log(newAllVoters);
    //
    //   votedBand.set('voteRank', newVoteRank);
    //
    //   this.save({
    //     id: id,
    //     // band: votedBand,
    //     name: votedBand.name,
    //     allVotes: newVoteRank,
    //     allVoters: newAllVoters
    //   },{
    //     success: (model, response) => {
    //       console.log(model);
    //       console.log(id);
    //       console.log('SUCCESS! YOU VOTED FOR: ', votedBand.name);
    //     },
    //     error: function(model, response) {
    //       throw new Error('FAILED TO VOTE');
    //    }
    //   });
    // };

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
