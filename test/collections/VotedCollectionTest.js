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

});
