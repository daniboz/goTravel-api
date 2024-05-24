const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('../../models/Restaurant');
const User = require('../../models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to MongoDB');
  populateData();
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

const restaurants = [
  {
    name: "Joe's Pizza",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGRpbmluZ3xlbnwwfHx8fDE2ODM3MDYwMjc&ixlib=rb-1.2.1&q=80&w=1080",
    description: "Famous pizzeria serving classic New York-style pizza since 1975.",
    coordinates: { latitude: 40.730610, longitude: -73.935242 },
    rating: 5,
    location: { city: "New York", country: "USA" },
    reviewCount: 320,
    hours: "11:00 AM - 11:00 PM",
    types: ["Italian", "Fast Food"],
    priceRange: "$",
    dietaryOptions: ["Vegetarian"],
    reviews: [
      {
        username: 'user1',
        rating: 5,
        review: 'The best pizza in New York! A must-try.',
        updatedAt: new Date().toISOString()
      },
      {
        username: 'user2',
        rating: 5,
        review: 'Absolutely delicious, the crust is perfect!',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "Le Jules Verne",
    imageUrl: "https://images.unsplash.com/photo-1543353071-873f17a7a088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGRpbmluZ3xlbnwwfHx8fDE2ODM3MDU5OTM&ixlib=rb-1.2.1&q=80&w=1080",
    description: "Gourmet restaurant located in the Eiffel Tower, Paris.",
    coordinates: { latitude: 48.8584, longitude: 2.2945 },
    rating: 5,
    location: { city: "Paris", country: "France" },
    reviewCount: 150,
    hours: "12:00 PM - 10:00 PM",
    types: ["French", "Fine Dining"],
    priceRange: "$$$",
    dietaryOptions: ["Vegetarian", "Gluten-Free"],
    reviews: [
      {
        username: 'user1',
        rating: 5,
        review: 'Exquisite dining experience with a view!',
        updatedAt: new Date().toISOString()
      },
      {
        username: 'user2',
        rating: 4,
        review: 'Amazing food, but a bit pricey.',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "Peking Duck House",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGR1Y2slMjBob3VzZXxlbnwwfHx8fDE2ODM3MDYwMDU&ixlib=rb-1.2.1&q=80&w=1080",
    description: "Authentic Peking duck served in a traditional setting.",
    coordinates: { latitude: 39.9042, longitude: 116.4074 },
    rating: 4,
    location: { city: "Beijing", country: "China" },
    reviewCount: 220,
    hours: "10:00 AM - 10:00 PM",
    types: ["Chinese"],
    priceRange: "$$",
    dietaryOptions: ["Halal"],
    reviews: [
      {
        username: 'user4',
        rating: 4,
        review: 'Delicious Peking duck, a must-try!',
        updatedAt: new Date().toISOString()
      },
      {
        username: 'user2',
        rating: 4,
        review: 'Great experience, but the service could be better.',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "Karim's",
    imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGlkaWFuJTIwZm9vZHxlbnwwfHx8fDE2ODM3MDYwMTY&ixlib=rb-1.2.1&q=80&w=1080",
    description: "Legendary Mughlai restaurant in Old Delhi, India.",
    coordinates: { latitude: 28.6562, longitude: 77.2410 },
    rating: 5,
    location: { city: "Delhi", country: "India" },
    reviewCount: 320,
    hours: "12:00 PM - 11:00 PM",
    types: ["Indian"],
    priceRange: "$$",
    dietaryOptions: ["Halal", "Vegetarian"],
    reviews: [
      {
        username: 'user1',
        rating: 5,
        review: 'Authentic and flavorful Mughlai dishes!',
        updatedAt: new Date().toISOString()
      },
      {
        username: 'user4',
        rating: 5,
        review: 'Rich flavors and a cultural experience.',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "Central Restaurante",
    imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGRpbmluZ3xlbnwwfHx8fDE2ODM3MDYwMjA&ixlib=rb-1.2.1&q=80&w=1080",
    description: "Contemporary Peruvian cuisine by chef Virgilio Martínez.",
    coordinates: { latitude: -12.0464, longitude: -77.0428 },
    rating: 5,
    location: { city: "Lima", country: "Peru" },
    reviewCount: 540,
    hours: "1:00 PM - 10:00 PM",
    types: ["Peruvian", "Fine Dining"],
    priceRange: "$$$",
    dietaryOptions: ["Gluten-Free", "Vegan"],
    reviews: [
      {
        username: 'user2',
        rating: 5,
        review: 'Innovative dishes with local ingredients.',
        updatedAt: new Date().toISOString()
      },
      {
        username: 'user4',
        rating: 5,
        review: 'A culinary adventure in every bite.',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "La Pergola",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGRpbmluZ3xlbnwwfHx8fDE2ODM3MDYwMjc&ixlib=rb-1.2.1&q=80&w=1080",
    description: "Fine dining with panoramic views of Rome.",
    coordinates: { latitude: 41.9038, longitude: 12.4950 },
    rating: 5,
    location: { city: "Rome", country: "Italy" },
    reviewCount: 250,
    hours: "12:00 PM - 11:00 PM",
    types: ["Italian", "Fine Dining"],
    priceRange: "$$$",
    dietaryOptions: ["Vegetarian"],
    reviews: [
      {
        username: 'user1',
        rating: 5,
        review: 'Elegant dining with breathtaking views.',
        updatedAt: new Date().toISOString()
      },
      {
        username: 'user2',
        rating: 5,
        review: 'A luxurious experience from start to finish.',
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    name: "Quay",
    imageUrl: "https://images.unsplash.com/photo-1533777324565-a040eb52fac2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGRpbmluZ3xlbnwwfHx8fDE2ODM3MDYwMzE&ixlib=rb-1.2.1&q=80&w=1080",
    description: "Modern Australian cuisine with stunning harbor views.",
    coordinates: { latitude: -33.8568, longitude: 151.2153 },
    rating: 5,
    location: { city: "Sydney", country: "Australia" },
    reviewCount: 480,
    hours: "11:00 AM - 10:00 PM",
    types: ["Australian", "Fine Dining"],
    priceRange: "$$$",
    dietaryOptions: ["Vegetarian", "Gluten-Free"],
    reviews: [
      {
        username: 'user4',
        rating: 5,
        review: 'Creative dishes with a beautiful presentation.',
        updatedAt: new Date().toISOString()
      },
      {
        username: 'user1',
        rating: 5,
        review: 'A perfect blend of flavors and scenery.',
        updatedAt: new Date().toISOString()
      }
    ]
  }
];

async function populateData() {
  try {
    await Restaurant.deleteMany({});

    for (let restaurant of restaurants) {
      for (let review of restaurant.reviews) {
        const user = await User.findOne({ username: review.username });
        if (user) {
          review.user = user._id;
        } else {
          throw new Error(`User not found: ${review.username}`);
        }
      }
    }

    await Restaurant.insertMany(restaurants);
    console.log('Database populated with restaurant data');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error populating database', err);
    mongoose.connection.close();
  }
}
