import Backbone from 'backbone';
import $ from 'jquery';

import VotedModel from '../models/VotedModel';
import store from '../store';

const VotedCollection = Backbone.Collection.extend({
  model: VotedModel,
  url: `https://baas.kinvey.com/appdata/kid_Bk73T0yt/VotedCollection`,
});

export default VotedCollection;
