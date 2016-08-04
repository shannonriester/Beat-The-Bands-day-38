import Backbone from 'backbone';

const BandModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/kid_Bk73T0yt/VotedCollection`,

});

export default BandModel;
