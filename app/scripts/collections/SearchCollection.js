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
  toggleBandModal: function (id) {
    console.log(model);
    // let model = store.collection.get(id);
    if (model) {
      //if the model is NOT being viewed, aka (HIDING the MODAL)
      if (!this.get(model).get('viewing')) {
        this.get(model).set('viewing', true);
      } else {
        this.get(model).set('viewing', false);
        // this.stopPropagation();
      }
    } else {
      this.set('viewing', false);
    }
  }
});

export default SearchCollection;
