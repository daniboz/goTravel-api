const request = require('supertest');
const app = require('../server');
const { connect, closeDatabase, clearDatabase } = require('./setup');
const Attraction = require('../models/Attraction');
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

describe('Attraction API', () => {
  beforeEach(async () => {
    const attraction1 = new Attraction({
      _id: '664e4547558e4944ae61a8f1',
      name: 'Statue of Liberty',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Statue_of_Liberty%2C_NY.jpg',
      description: 'The Statue of Liberty, a colossal neoclassical sculpture on Liberty Island in New York Harbor.',
      coordinates: { latitude: 40.6892, longitude: -74.0445 },
      rating: 5,
      location: { city: 'New York', country: 'USA' },
      reviewCount: 320,
      hours: '9:00 AM - 5:00 PM',
      reviews: [
        { user: '664b9ba55659cb3efd0f35ee', rating: 5, review: 'An iconic symbol of freedom!' },
        { user: '664bb98638490c5012c17413', rating: 5, review: 'Absolutely breathtaking!' },
      ],
      types: ['Sights', 'Museums'],
      duration: '1-3hr',
      suitability: ['Families'],
    });

    await attraction1.save();
  });

  describe('GET /api/attractions/filter', () => {
    it('should return filtered attractions', (done) => {
      request(app)
        .get('/api/attractions/filter')
        .query({ query: 'Statue', types: ['Sights'], ratings: [5], durations: ['1-3hr'], suitabilities: ['Families'] })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body.attractions).to.be.an('array').that.is.not.empty;
          done();
        });
    });
  });

  describe('GET /api/attractions/:id', () => {
    it('should return attraction details', (done) => {
      request(app)
        .get('/api/attractions/664e4547558e4944ae61a8f1')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', 'Statue of Liberty');
          done();
        });
    });
  });

  describe('POST /api/attractions', () => {
    it('should create a new attraction', (done) => {
      const newAttraction = {
        name: 'New Attraction',
        description: 'Description',
        imageUrl: 'http://example.com/image.jpg',
        location: { city: 'City', country: 'Country' },
        coordinates: { latitude: 10.0, longitude: 20.0 },
        types: ['outdoor'],
        duration: '2 hours',
        suitability: ['family'],
        hours: '9AM - 5PM'
      };
      request(app)
        .post('/api/attractions')
        .send(newAttraction)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', 'New Attraction');
          done();
        });
    });
  });

  describe('PUT /api/attractions/:id', () => {
    it('should update an existing attraction', (done) => {
      const updatedAttraction = { name: 'Updated Attraction' };
      request(app)
        .put('/api/attractions/664e4547558e4944ae61a8f1')
        .send(updatedAttraction)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', 'Updated Attraction');
          done();
        });
    });
  });

  describe('DELETE /api/attractions/:id', () => {
    it('should delete an attraction', (done) => {
      request(app)
        .delete('/api/attractions/664e4547558e4944ae61a8f1')
        .expect(204)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
