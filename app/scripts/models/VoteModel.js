import Backbone from 'backbone';
import _ from 'underscore';

import store from '../store';

const VoteModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/kid_Bk73T0yt/VotedCollection`,
  defaults: {
    spotifyId: '',
    name: '',
    voteRank: 0,
    allVoters: [],
  },

    // console.log(didVote);

    // console.log(this.get('allVoters'));

    // band.save();


});

export default VoteModel;
