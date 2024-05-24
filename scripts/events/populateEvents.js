const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('../../models/Event');
const User = require('../../models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to MongoDB');
  populateData();
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

const events = [
  {
    name: "Euro 2024",
    imageUrl: "https://trthaberstatic.cdn.wp.trt.com.tr/resimler/1928000/euro-2024-depophotos-1928725.jpg",
    description: "The 2024 UEFA European Football Championship, commonly referred to as Euro 2024.",
    date: "June 14, 2024",
    coordinates: { latitude: 52.5200, longitude: 13.4050 },
    rating: 5,
    location: { city: "Berlin", country: "Germany" },
    reviewCount: 200,
    types: ["Sports"],
    duration: ">3hr",
    suitability: ["Family-Friendly", "Outdoor"],
    reviews: [
      {
        user: { username: 'user1' },
        rating: 5,
        review: 'Fantastic atmosphere and great matches!',
        updatedAt: new Date().toISOString()
      },
      {
        user: { username: 'user2' },
        rating: 5,
        review: 'A must-attend for any football fan!',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "Untold Festival",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/82/Untold_2019_logo.png",
    description: "Annual electronic music festival held in Cluj-Napoca, Romania.",
    date: "August 1, 2024",
    coordinates: { latitude: 46.770439, longitude: 23.591423 },
    rating: 5,
    location: { city: "Cluj-Napoca", country: "Romania" },
    reviewCount: 300,
    types: ["Festivals"],
    duration: ">3hr",
    suitability: ["Partying", "Outdoor"],
    reviews: [
      {
        user: { username: 'user1' },
        rating: 5,
        review: 'An unforgettable experience with amazing performances!',
        updatedAt: new Date().toISOString()
      },
      {
        user: { username: 'user2' },
        rating: 4,
        review: 'Great vibes and fantastic music!',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "Enrique Iglesias Concert",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/00/Enrique_Iglesias_2011_4.jpg",
    description: "Live concert by Enrique Iglesias.",
    date: "July 10, 2024",
    coordinates: { latitude: 40.416775, longitude: -3.703790 },
    rating: 5,
    location: { city: "Madrid", country: "Spain" },
    reviewCount: 180,
    types: ["Concerts"],
    duration: "1-3hr",
    suitability: ["Indoor"],
    reviews: [
      {
        user: { username: 'user4' },
        rating: 5,
        review: 'Enrique was amazing live!',
        updatedAt: new Date().toISOString()
      },
      {
        user: { username: 'user1' },
        rating: 5,
        review: 'One of the best concerts I have ever attended!',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "Tech Innovators Conference",
    imageUrl: "https://www.publicdomainpictures.net/pictures/320000/velka/technology-background.jpg",
    description: "Annual conference showcasing the latest in tech innovations.",
    date: "September 20, 2024",
    coordinates: { latitude: 37.7749, longitude: -122.4194 },
    rating: 4,
    location: { city: "San Francisco", country: "USA" },
    reviewCount: 120,
    types: ["Conferences"],
    duration: "1-3hr",
    suitability: ["Indoor"],
    reviews: [
      {
        user: { username: 'user4' },
        rating: 4,
        review: 'Very informative and well-organized.',
        updatedAt: new Date().toISOString()
      },
      {
        user: { username: 'user2' },
        rating: 4,
        review: 'Great speakers and interesting topics.',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "International Film Festival",
    imageUrl: "https://www.publicdomainpictures.net/pictures/30000/velka/film-strip.jpg",
    description: "Annual film festival showcasing the best in international cinema.",
    date: "May 15, 2024",
    coordinates: { latitude: 48.8566, longitude: 2.3522 },
    rating: 5,
    location: { city: "Paris", country: "France" },
    reviewCount: 250,
    types: ["Festivals"],
    duration: ">3hr",
    suitability: ["Indoor"],
    reviews: [
      {
        user: { username: 'user1' },
        rating: 5,
        review: 'A cinephile’s paradise with amazing film selections!',
        updatedAt: new Date().toISOString()
      },
      {
        user: { username: 'user2' },
        rating: 5,
        review: 'Incredible films and fantastic atmosphere.',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "Oktoberfest",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Oktoberfest.jpg",
    description: "World's largest Volksfest held annually in Munich, Germany.",
    date: "September 21, 2024",
    coordinates: { latitude: 48.1351, longitude: 11.5820 },
    rating: 5,
    location: { city: "Munich", country: "Germany" },
    reviewCount: 500,
    types: ["Festivals"],
    duration: ">3hr",
    suitability: ["Family-Friendly", "Outdoor"],
    reviews: [
      {
        user: { username: 'user4' },
        rating: 5,
        review: 'The best festival ever! Great beer and amazing people.',
        updatedAt: new Date().toISOString()
      },
      {
        user: { username: 'user1' },
        rating: 5,
        review: 'A wonderful experience, highly recommend attending!',
        updatedAt: new Date().toISOString()
      }
    ]
  }
];

async function populateData() {
  try {
    await Event.deleteMany({});

    for (let event of events) {
      for (let review of event.reviews) {
        const user = await User.findOne({ username: review.user.username });
        if (user) {
          review.user = user._id;
        } else {
          throw new Error(`User not found: ${review.user.username}`);
        }
      }
    }

    await Event.insertMany(events);
    console.log('Database populated with event data');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error populating database', err);
    mongoose.connection.close();
  }
}
