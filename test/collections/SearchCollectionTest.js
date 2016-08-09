import { expect } from 'chai';
import SearchCollection from '../../app/scripts/collections/SearchCollection';

describe ('SearchCollection', function(){
  let searchTest = new SearchCollection();

  it('should exist', () => {
    expect(searchTest).to.exist;
  });

  it('should have a BandModel, getResults and toggleBandModal functions on it', () => {
    expect(searchTest.model).to.be.a('function');
    expect(searchTest.getResults).to.be.a('function');
    expect(searchTest.toggleBandModal).to.be.a('function');
  });
});
