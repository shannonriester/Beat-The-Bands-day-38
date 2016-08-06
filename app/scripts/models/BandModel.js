import Backbone from 'backbone';

import store from '../store';

const BandModel = Backbone.Model.extend({
  idAttribute: '',
  defaults: {
    voteRank: 0,
    viewing: false,
    // spotifyId: ''
  },
});

export default BandModel;
