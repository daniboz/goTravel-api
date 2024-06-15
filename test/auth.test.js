const request = require('supertest');
const app = require('../server');
const { connect, closeDatabase, clearDatabase } = require('./setup');
const User = require('../models/User');
const mongoose = require('mongoose');

let expect;

before(async function() {
  this.timeout(30000);
  await connect();
  const chai = await import('chai');
  expect = chai.expect;
});

after(async function() {
  this.timeout(30000); 
  await closeDatabase();
});

beforeEach(async () => {
  await clearDatabase();
});

describe('Auth API', () => {
  beforeEach(async () => {
    const user1 = new User({
      _id: '664b9ba55659cb3efd0f35ee',
      username: 'user1',
      email: 'user1@example.com',
      password: 'U2FsdGVkX1/ePivPg+KqaMPYAaHD5uXQpy8C5yJBOII=',
      profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJXWdvwDZC0RF_VSzzP8aXSX9Sc_VPAtuew&usqp=CAU',
    });

    await user1.save();
  });

  describe('POST /api/register', () => {
    it('should register a new user', (done) => {
      const newUser = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123'
      };
      request(app)
        .post('/api/register')
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status', true);
          expect(res.body).to.have.property('message', 'User successfully created');
          done();
        });
    });
  });

  describe('POST /api/login', () => {
    it('should log in an existing user', (done) => {
      const credentials = {
        usernameOrEmail: 'user1@example.com',
        password: 'password123'
      };
      request(app)
        .post('/api/login')
        .send(credentials)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status', true);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });
});
