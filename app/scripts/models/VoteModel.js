import Backbone from 'backbone';
import _ from 'underscore';

const VoteModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/kid_Bk73T0yt/VotedCollection`,
  defaults: {
    spotifyId: '',
    name: '',
    voteRank: 0,
    allVoters: [],
    viewing: false,
  },

});

export default VoteModel;
