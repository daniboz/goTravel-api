const request = require('supertest');
const app = require('../server');
const { connect, closeDatabase, clearDatabase } = require('./setup');
const CalendarEntry = require('../models/CalendarEntry');
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

describe('Calendar Entry API', () => {
  let token;

  beforeEach(async () => {
    const user1 = {
      _id: '664b9ba55659cb3efd0f35ee',
      username: 'user1',
      email: 'user1@example.com',
      password: 'U2FsdGVkX1/ePivPg+KqaMPYAaHD5uXQpy8C5yJBOII=',
      profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJXWdvwDZC0RF_VSzzP8aXSX9Sc_VPAtuew&usqp=CAU',
    };

    await User.create(user1);
    token = jwt.sign({ id: user1._id, isAdmin: user1.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const entry1 = new CalendarEntry({
      _id: '66547d160ada206fc405a754',
      user: '664b9ba55659cb3efd0f35ee',
      name: 'Sample All Day Event',
      isAllDay: true,
      attraction: '664e4547558e4944ae61a8f4',
    });

    await entry1.save();
  });

  describe('GET /api/calendar-entries', () => {
    it('should return calendar entries for the current user', (done) => {
      request(app)
        .get('/api/calendar-entries')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array').that.is.not.empty;
          done();
        });
    });
  });

  describe('POST /api/calendar-entries', () => {
    it('should create a new calendar entry', (done) => {
      const newEntry = {
        name: 'New Event',
        start: '2024-06-15T09:00:00Z',
        end: '2024-06-15T11:00:00Z',
        isAllDay: false,
        attraction: '664e4547558e4944ae61a8f4'
      };
      request(app)
        .post('/api/calendar-entries')
        .set('Authorization', `Bearer ${token}`)
        .send(newEntry)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', 'New Event');
          done();
        });
    });
  });

  describe('PUT /api/calendar-entries/:id', () => {
    it('should update an existing calendar entry', (done) => {
      const updatedEntry = { name: 'Updated Event' };
      request(app)
        .put('/api/calendar-entries/66547d160ada206fc405a754')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedEntry)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', 'Updated Event');
          done();
        });
    });
  });

  describe('DELETE /api/calendar-entries/:id', () => {
    it('should delete a calendar entry', (done) => {
      request(app)
        .delete('/api/calendar-entries/66547d160ada206fc405a754')
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
