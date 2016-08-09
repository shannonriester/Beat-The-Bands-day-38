import Backbone from 'backbone';

const BandModel = Backbone.Model.extend({
  idAttribute: 'spotifyId',
  defaults: {
    voteRank: 0,
    viewing: false,
  },
});

export default BandModel;
