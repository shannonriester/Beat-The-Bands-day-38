import Backbone from 'backbone';

import store from '../store';

const BandModel = Backbone.Model.extend({
  idAttribute: '',
  defaults: {
    votesMade: 0,
    votedBands: [],
    viewing: false
  },
  
});

export default BandModel;
