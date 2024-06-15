const request = require('supertest');
const app = require('../server');
const { connect, closeDatabase, clearDatabase } = require('./setup');
const Restaurant = require('../models/Restaurant');
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

describe('Restaurant API', () => {
  beforeEach(async () => {
    const restaurant1 = new Restaurant({
      _id: '664fbeac150a7ff2e69dd509',
      name: "Joe's Pizza",
      description: 'Famous pizzeria serving classic New York-style pizza since 1975.',
      imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGRpbmluZ3xlbnwwfHx8fDE2ODM3MDYwMjc&ixlib=rb-1.2.1&q=80&w=1080',
      location: { city: 'New York', country: 'USA' },
      coordinates: { latitude: 40.73061, longitude: -73.935242 },
      types: ['Italian', 'Fast Food'],
      priceRange: '$',
      dietaryOptions: ['Vegetarian'],
      rating: 5,
      reviewCount: 320,
      reviews: [
        { user: '664b9ba55659cb3efd0f35ee', rating: 5, review: 'The best pizza in New York! A must-try.' },
        { user: '664bb98638490c5012c17413', rating: 5, review: 'Absolutely delicious, the crust is perfect!' }
      ],
      hours: '9:00 AM - 10:00 PM'
    });

    await restaurant1.save();
  });

  describe('GET /api/restaurants/filter', () => {
    it('should return filtered restaurants', (done) => {
      request(app)
        .get('/api/restaurants/filter')
        .query({ query: 'Joe', types: ['Italian'], ratings: [5], priceRanges: ['$'], dietaryOptions: ['Vegetarian'] })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body.restaurants).to.be.an('array').that.is.not.empty;
          done();
        });
    });
  });

  describe('GET /api/restaurants/:id', () => {
    it('should return restaurant details', (done) => {
      request(app)
        .get('/api/restaurants/664fbeac150a7ff2e69dd509')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', "Joe's Pizza");
          done();
        });
    });
  });

  describe('POST /api/restaurants', () => {
    it('should create a new restaurant', (done) => {
      const newRestaurant = {
        name: 'New Restaurant',
        description: 'Description',
        imageUrl: 'http://example.com/image.jpg',
        location: { city: 'City', country: 'Country' },
        coordinates: { latitude: 10.0, longitude: 20.0 },
        types: ['fast food'],
        priceRange: '$',
        dietaryOptions: ['vegan'],
        hours: '9:00 AM - 9:00 PM'
      };
      request(app)
        .post('/api/restaurants')
        .send(newRestaurant)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', 'New Restaurant');
          done();
        });
    });
  });

  describe('PUT /api/restaurants/:id', () => {
    it('should update an existing restaurant', (done) => {
      const updatedRestaurant = { name: 'Updated Restaurant' };
      request(app)
        .put('/api/restaurants/664fbeac150a7ff2e69dd509')
        .send(updatedRestaurant)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', 'Updated Restaurant');
          done();
        });
    });
  });

  describe('DELETE /api/restaurants/:id', () => {
    it('should delete a restaurant', (done) => {
      request(app)
        .delete('/api/restaurants/664fbeac150a7ff2e69dd509')
        .expect(204)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
