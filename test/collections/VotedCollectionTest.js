import { expect } from 'chai';
import VotedCollection from '../../app/scripts/collections/VotedCollection';

describe ('VotedCollection', function() {
    let votedTest = new VotedCollection();
    it('should exist', () => {
      expect(votedTest).to.exist;
    });

    it('should have a VotedModel property value on it', () => {
      expect(votedTest.model).to.be('VoteModel');
    });

    it('should have a BandModel, getResults and toggleBandModal functions on it', () => {
      expect(votedTest.getKinveyId).to.be.a('function');
      expect(votedTest.unVoteFunction).to.be.a('function');
      expect(votedTest.addVoteFunction).to.be.a('function');
      expect(votedTest.createVoteModel).to.be.a('function');
      expect(votedTest.voteToggle).to.be.a('function');
      expect(votedTest.toggleBandModal).to.be.a('function');
    });

    it('has a function, getKinveyId, that should return a string', () => {
      votedTest.fetch({success: (response) => {
        expect(votedTest.getKinveyId('06HL4z0CvFAxyc27GXpf02')).to.be.a('string');
      }});
    });

});
