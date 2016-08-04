import Backbone from 'backbone';
import $ from 'jquery';

import VoteModel from '../models/VoteModel';
import store from '../store';

const VotedCollection = Backbone.Collection.extend({
  model: VoteModel,
  url: `https://baas.kinvey.com/appdata/kid_Bk73T0yt/VotedCollection`,
});

export default VotedCollection;
