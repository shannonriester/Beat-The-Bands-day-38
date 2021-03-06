import { expect } from 'chai';
import SessionModel from '../../app/scripts/models/SessionModel';

describe ('SessionModel', function(){
  let sessionTest = new SessionModel();

  it('should exist', () => {
    expect(sessionTest).to.exist;
  });
  it('should have the properties: getLocation, parse, login, signup, logout, retrieve', () => {
    expect(sessionTest).to.have.property('parse');
    expect(sessionTest).to.have.property('login');
    expect(sessionTest).to.have.property('signup');
    expect(sessionTest).to.have.property('logout');
    expect(sessionTest).to.have.property('retrieve');
  });

  it('\'s properties should all be functions', () => {
    expect(sessionTest.parse).to.be.a('function');
    expect(sessionTest.login).to.be.a('function');
    expect(sessionTest.signup).to.be.a('function');
    expect(sessionTest.logout).to.be.a('function');
    expect(sessionTest.retrieve).to.be.a('function');
  });
  it('should respond to the methods: ', () => {
    expect(sessionTest).to.respondTo('parse');
    expect(sessionTest).to.respondTo('login');
    expect(sessionTest).to.respondTo('signup');
    expect(sessionTest).to.respondTo('logout');
    expect(sessionTest).to.respondTo('retrieve');
  });


  // it('should be satisfied with two string arguments', () => {
  //   let username = 'shannon';
  //   let password = 'password';
  //   expect(username, password).to.satisfy(sessionTest.login(username, password));
  // });



});
