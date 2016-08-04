import Backbone from 'backbone';

const VoteModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/kid_Bk73T0yt/VotedCollection`,
  allVotes: 0,
  allVoters: [],
  voteToggle: function(band) {
    console.log(band);
  },

});

export default VoteModel;
