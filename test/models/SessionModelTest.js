import { expect } from 'chai';
import SessionModel from '../../app/scripts/models/SessionModel.js';

describe ('SessionModel', function(){
  let sessionTest = new SessionModel();
  
  console.log(sessionTest);
  it('should exist', () => {
    expect(sessionTest).to.exist;
  });

});
