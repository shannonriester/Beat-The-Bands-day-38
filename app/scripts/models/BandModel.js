import Backbone from 'backbone';

import store from '../store';

const BandModel = Backbone.Model.extend({
  idAttribute: 'spotifyId',
  defaults: {
    voteRank: 0,
    viewing: false,
  },
});

export default BandModel;
