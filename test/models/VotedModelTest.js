import { expect } from 'chai';
import VoteModel from '../../app/scripts/models/VoteModel.js';

describe ('BandModel', function() {
  let voteTest = new VoteModel();

  it('should exist', () => {
    expect(voteTest).to.exist;
  });

  it('its idAttribute and urlRoot should be set to string values', () => {
    expect(voteTest.idAttribute).to.eql('_id');;
    expect(voteTest.urlRoot).to.eql('https://baas.kinvey.com/appdata/kid_Bk73T0yt/VotedCollection');;
  });

  it('its default value, voteRank, should be 0', () => {
    expect(voteTest.get('voteRank')).to.eql(0);
  });
  it('its default value, viewing, should be set to false', () => {
    expect(voteTest.get('viewing')).to.eql(false);
  });


  it('its default values, spotifyId, name, and allVoters, should contain empty values', () => {
    expect(voteTest.get('spotifyId')).to.be.empty;
    expect(voteTest.get('spotifyId')).to.eql('');

    expect(voteTest.get('name')).to.be.empty;
    expect(voteTest.get('name')).to.eql('');

    expect(voteTest.get('allVoters')).to.be.empty;
    expect(voteTest.get('allVoters')).to.eql([]);

  });








});
