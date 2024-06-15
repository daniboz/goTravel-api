const request = require('supertest');
const app = require('../server');
const { connect, closeDatabase, clearDatabase } = require('./setup');
const Event = require('../models/Event');
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

describe('Event API', () => {
  beforeEach(async () => {
    const event1 = new Event({
      _id: '665113c0975df53ba71ddadd',
      name: 'Euro 2024',
      imageUrl: 'https://trthaberstatic.cdn.wp.trt.com.tr/resimler/1928000/euro-2024-depophotos-1928725.jpg',
      description: 'The 2024 UEFA European Football Championship, commonly referred to as Euro 2024.',
      date: 'June 14, 2024',
      coordinates: { latitude: 52.52, longitude: 13.405 },
      rating: 5,
      location: { city: 'Berlin', country: 'Germany' },
      reviewCount: 199,
      types: ['Sports'],
      duration: '>3hr',
      suitability: ['Family-Friendly', 'Outdoor'],
      reviews: [
        { user: '664bb98638490c5012c17413', rating: 5, review: 'A must-attend for any football fan!' }
      ],
    });

    await event1.save();
  });

  describe('GET /api/events/filter', () => {
    it('should return filtered events', (done) => {
      request(app)
        .get('/api/events/filter')
        .query({ query: 'Euro', types: ['Sports'], ratings: [5], durations: ['>3hr'], suitabilities: ['Family-Friendly'] })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body.events).to.be.an('array').that.is.not.empty;
          done();
        });
    });
  });

  describe('GET /api/events/:id', () => {
    it('should return event details', (done) => {
      request(app)
        .get('/api/events/665113c0975df53ba71ddadd')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', 'Euro 2024');
          done();
        });
    });
  });

  describe('POST /api/events', () => {
    it('should create a new event', (done) => {
      const newEvent = {
        name: 'New Event',
        description: 'Description',
        imageUrl: 'http://example.com/image.jpg',
        location: { city: 'City', country: 'Country' },
        coordinates: { latitude: 10.0, longitude: 20.0 },
        types: ['festival'],
        duration: '2 hours',
        suitability: ['family'],
        date: '2024-06-15'
      };
      request(app)
        .post('/api/events')
        .send(newEvent)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', 'New Event');
          done();
        });
    });
  });

  describe('PUT /api/events/:id', () => {
    it('should update an existing event', (done) => {
      const updatedEvent = { name: 'Updated Event' };
      request(app)
        .put('/api/events/665113c0975df53ba71ddadd')
        .send(updatedEvent)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', 'Updated Event');
          done();
        });
    });
  });

  describe('DELETE /api/events/:id', () => {
    it('should delete an event', (done) => {
      request(app)
        .delete('/api/events/665113c0975df53ba71ddadd')
        .expect(204)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
