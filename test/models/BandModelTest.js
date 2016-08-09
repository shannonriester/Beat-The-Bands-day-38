import { expect } from 'chai';
import BandModel from '../../app/scripts/models/BandModel.js';

describe ('BandModel', function() {
  let bandTest = new BandModel();

  it('should exist', () => {
    expect(bandTest).to.exist;
  });

  it('its default value, voteRank, should be 0', () => {
    expect(bandTest.get('voteRank')).to.eql(0);
  });
  it('its default value, viewing, should be set to false', () => {
    expect(bandTest.get('viewing')).to.eql(false);
  });
  it('its idAttribute should be set to a string', () => {
    console.log(bandTest.idAttribute);
    expect(bandTest.idAttribute).to.eql('spotifyId');;
  });

});
