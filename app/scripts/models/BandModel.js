import Backbone from 'backbone';

import store from '../store';

const BandModel = Backbone.Model.extend({
  idAttribute: '',
  defaults: {
    votesMade: 0,
    votedBands: [],
    viewing: false
  },
  // toggleBandModal: function (model) {
  //   console.log(model);
  //   // let model = store.collection.get(id);
  //   if (model) {
  //     //if the model is NOT being viewed, aka (HIDING the MODAL)
  //     if (!this.get(model).viewing) {
  //       this.get(model).set('viewing', true);
  //     } else {
  //       this.get(model).set('viewing', false);
  //       this.stopPropagation();
  //     }
  //   } else {
  //     this.set('viewing', flase);
  //   }
  // }
});

export default BandModel;
