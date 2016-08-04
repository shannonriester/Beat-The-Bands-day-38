import Backbone from 'backbone';

const BandModel = Backbone.Model.extend({
  idAttribute: '',
  votesMade: 0,
  votedBands: []
});

export default BandModel;
