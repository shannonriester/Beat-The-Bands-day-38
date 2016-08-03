import Backbone from 'backbone';

import BandModel from '../models/BandModel';

const SearchCollection = Backbone.Collection.extend({
  model: BandModel,
  url: `https://api.spotify.com/v1/search`,
  getResults: function(searchQuery) {
    this.fetch({
      data: {q: searchQuery, type: 'artist'},
      success: (data) => {
        console.log(data);
      }
    });
  }
  newSearch: function(){}
});

export default SearchCollection;
