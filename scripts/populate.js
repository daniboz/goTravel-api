const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Attraction = require('../models/Attraction');
const User = require('../models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(async () => {
  console.log('Connected to MongoDB');
  await populateData();
  mongoose.connection.close();
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

const users = {
  "NYCLover": "664b9ba55659cb3efd0f35ee",
  "HistoryBuff": "664bb98638490c5012c17413",
  "ParisianDreamer": "664bbe44e9040066186f6782",
  "ArtLover": "664b9ba55659cb3efd0f35ee",
  "ArtEnthusiast": "664bb98638490c5012c17413",
  "CultureVulture": "664bbe44e9040066186f6782",
  "FamilyTraveler": "664b9ba55659cb3efd0f35ee",
  "DisneyFan": "664bb98638490c5012c17413",
  "NightlifeLover": "664bbe44e9040066186f6782",
  "DanceFan": "664b9ba55659cb3efd0f35ee"
};

const attractions = [
  {
    name: "Statue of Liberty",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Statue_of_Liberty%2C_NY.jpg",
    description: "The Statue of Liberty, a colossal neoclassical sculpture on Liberty Island in New York Harbor.",
    coordinates: { latitude: 40.6892, longitude: -74.0445 },
    rating: 5,
    location: { city: "New York", country: "USA" },
    reviewCount: 320,
    hours: "9:00 AM - 5:00 PM",
    types: ["Sights", "Museums"],
    duration: "1-3hr",
    suitability: ["Families"],
    reviews: [
      {
        user: users["NYCLover"],
        rating: 5,
        review: 'An iconic symbol of freedom!',
        updatedAt: new Date().toISOString()
      },
      {
        user: users["HistoryBuff"],
        rating: 5,
        review: 'Absolutely breathtaking!',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "Eiffel Tower",
    imageUrl: "https://th.bing.com/th/id/OIP.AW_3WtO4mpBHZSZBQ9OQ9QHaE8?rs=1&pid=ImgDetMain",
    description: "A wrought-iron lattice tower on the Champ de Mars in Paris, France.",
    coordinates: { latitude: 48.8584, longitude: 2.2945 },
    rating: 5,
    location: { city: "Paris", country: "France" },
    reviewCount: 1050,
    hours: "9:30 AM - 11:45 PM",
    types: ["Sights"],
    duration: "1-3hr",
    suitability: ["Date Night"],
    reviews: [
      {
        user: users["ParisianDreamer"],
        rating: 5,
        review: 'Stunning views at night!',
        updatedAt: new Date().toISOString()
      },
      {
        user: users["ArtLover"],
        rating: 4,
        review: 'Marvelous ironwork details!',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "Louvre Museum",
    imageUrl: "https://th.bing.com/th/id/OIP.AW_3WtO4mpBHZSZBQ9OQ9QHaE8?rs=1&pid=ImgDetMain",
    description: "The world's largest art museum and a historic monument in Paris, France.",
    coordinates: { latitude: 48.8606, longitude: 2.3376 },
    rating: 5,
    location: { city: "Paris", country: "France" },
    reviewCount: 5200,
    hours: "9:00 AM - 6:00 PM",
    types: ["Museums"],
    duration: ">3hr",
    suitability: ["Rainy Day", "Families"],
    reviews: [
      {
        user: users["ArtEnthusiast"],
        rating: 5,
        review: 'A must-visit for art lovers!',
        updatedAt: new Date().toISOString()
      },
      {
        user: users["CultureVulture"],
        rating: 5,
        review: 'Incredible collection of art and history.',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "Disneyland Paris",
    imageUrl: "https://th.bing.com/th/id/OIP.XIP8n-FUuutxiV7G3s33xAHaEK?rs=1&pid=ImgDetMain",
    description: "An entertainment resort in Chessy, France, a new town located 32 km east of the center of Paris.",
    coordinates: { latitude: 48.8675, longitude: 2.7833 },
    rating: 5,
    location: { city: "Paris", country: "France" },
    reviewCount: 1300,
    hours: "10:00 AM - 10:00 PM",
    types: ["Amusement Parks"],
    duration: ">3hr",
    suitability: ["Families"],
    reviews: [
      {
        user: users["FamilyTraveler"],
        rating: 5,
        review: 'Great fun for the whole family!',
        updatedAt: new Date().toISOString()
      },
      {
        user: users["DisneyFan"],
        rating: 5,
        review: 'Magical experience!',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "Moulin Rouge",
    imageUrl: "https://th.bing.com/th/id/OIP.XIP8n-FUuutxiV7G3s33xAHaEK?rs=1&pid=ImgDetMain",
    description: "A cabaret in Paris, France, which was co-founded in 1889 by Charles Zidler and Joseph Oller.",
    coordinates: { latitude: 48.8842, longitude: 2.3321 },
    rating: 4,
    location: { city: "Paris", country: "France" },
    reviewCount: 2500,
    hours: "7:00 PM - 11:00 PM",
    types: ["Nightlife"],
    duration: "1-3hr",
    suitability: ["Date Night"],
    reviews: [
      {
        user: users["NightlifeLover"],
        rating: 4,
        review: 'Spectacular shows and atmosphere!',
        updatedAt: new Date().toISOString()
      },
      {
        user: users["DanceFan"],
        rating: 4,
        review: 'Amazing performances!',
        updatedAt: new Date().toISOString()
      }
    ]
  }
];

async function populateData() {
  try {
    await Attraction.deleteMany({});
    await Attraction.insertMany(attractions);
    console.log('Database populated with attractions data');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error populating database', err);
  }
}
