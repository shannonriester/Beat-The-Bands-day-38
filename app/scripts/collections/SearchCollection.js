import Backbone from 'backbone';
import $ from 'jquery';

import BandModel from '../models/BandModel';
import store from '../store';
// import '../../assets/noImg_Mic.png';

const SearchCollection = Backbone.Collection.extend({
  model: BandModel,
  url: `https://api.spotify.com/v1/search`,
  getResults: function(searchQuery) {
    $.ajax({
      type: 'GET',
      url: `https://api.spotify.com/v1/search`,
      data: {q: searchQuery, type: 'artist'},
      success: (data) => {
        this.reset();
        let bandData = data.artists.items.forEach((data, i, arr) => {
          if (data.images[0]) {
            this.add({
              id: data.id,
              type: data.artist,
              name: data.name,
              imageUrl: data.images[0].url,
              spotify_url: data.external_urls.spotify,
              followers: data.followers.total,
              popularity: data.popularity
            });
          }
        });
      }
    });
  },
});

export default SearchCollection;
