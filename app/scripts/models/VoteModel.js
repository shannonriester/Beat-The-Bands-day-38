import Backbone from 'backbone';

const VoteModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/kid_Bk73T0yt/VotedCollection`,
  allVotes: 0,
  allVoters: [],
  voteToggle: function(band) {
    let didVote = this.get('allVoters').filter(function(voter){
      console.log('you are trying to VOTETOGGLE()');
      if (store.session.get('username') === voter) {
        return true;
      } else {
        // let votersArr = this.get('allVoters');
        console.log(this.get('allVoters').push(store.session.get('username')));
        console.log(this.get('allVoters'));
        return false;
      }
    });

    // console.log(didVote);

    // console.log(this.get('allVoters'));

    // band.save();
  },

});

export default VoteModel;
