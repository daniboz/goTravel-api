const request = require('supertest');
const app = require('../server');
const { connect, closeDatabase, clearDatabase } = require('./setup');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
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

describe('User API', () => {
  let token;

  beforeEach(async () => {
    const user1 = new User({
      _id: '664b9ba55659cb3efd0f35ee',
      username: 'user1',
      email: 'user1@example.com',
      password: 'U2FsdGVkX1/ePivPg+KqaMPYAaHD5uXQpy8C5yJBOII=',
      profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJXWdvwDZC0RF_VSzzP8aXSX9Sc_VPAtuew&usqp=CAU',
    });

    await user1.save();
    token = jwt.sign({ id: user1._id, isAdmin: user1.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  describe('GET /api/users/me', () => {
    it('should return the current user', (done) => {
      request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('username', 'user1');
          done();
        });
    });
  });

  describe('PUT /api/users/me', () => {
    it('should update the current user', (done) => {
      const updatedUser = { username: 'updatedUser' };
      request(app)
        .put('/api/users/me')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body.user).to.have.property('username', 'updatedUser');
          done();
        });
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by ID', (done) => {
      request(app)
        .get('/api/users/664b9ba55659cb3efd0f35ee')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('username', 'user1');
          done();
        });
    });
  });
});
