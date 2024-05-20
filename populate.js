const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Attraction = require('./models/Attraction');
const Event = require('./models/Event'); // Uncomment if needed
const Restaurant = require('./models/Restaurant'); // Uncomment if needed

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  populateData();
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

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
        user: { username: 'NYCLover', profile: 'https://randomuser.me/api/portraits/men/10.jpg' },
        rating: 5,
        review: 'An iconic symbol of freedom!',
        updatedAt: new Date().toISOString()
      },
      {
        user: { username: 'HistoryBuff', profile: 'https://randomuser.me/api/portraits/women/10.jpg' },
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
        user: { username: 'ParisianDreamer', profile: 'https://randomuser.me/api/portraits/men/20.jpg' },
        rating: 5,
        review: 'Stunning views at night!',
        updatedAt: new Date().toISOString()
      },
      {
        user: { username: 'ArtLover', profile: 'https://randomuser.me/api/portraits/women/20.jpg' },
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
        user: { username: 'ArtEnthusiast', profile: 'https://randomuser.me/api/portraits/men/30.jpg' },
        rating: 5,
        review: 'A must-visit for art lovers!',
        updatedAt: new Date().toISOString()
      },
      {
        user: { username: 'CultureVulture', profile: 'https://randomuser.me/api/portraits/women/30.jpg' },
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
        user: { username: 'FamilyTraveler', profile: 'https://randomuser.me/api/portraits/men/40.jpg' },
        rating: 5,
        review: 'Great fun for the whole family!',
        updatedAt: new Date().toISOString()
      },
      {
        user: { username: 'DisneyFan', profile: 'https://randomuser.me/api/portraits/women/40.jpg' },
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
        user: { username: 'NightlifeLover', profile: 'https://randomuser.me/api/portraits/men/50.jpg' },
        rating: 4,
        review: 'Spectacular shows and atmosphere!',
        updatedAt: new Date().toISOString()
      },
      {
        user: { username: 'DanceFan', profile: 'https://randomuser.me/api/portraits/women/50.jpg' },
        rating: 4,
        review: 'Amazing performances!',
        updatedAt: new Date().toISOString()
      }
    ]
  }
];

const restaurants = [
  {
      id: 1,
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
              id: 1,
              user: {
                  username: 'PizzaLover',
                  profile: 'https://randomuser.me/api/portraits/men/10.jpg'
              },
              rating: 5,
              review: 'The best pizza in New York! A must-try.',
              updatedAt: new Date().toISOString()
          },
          {
              id: 2,
              user: {
                  username: 'Foodie',
                  profile: 'https://randomuser.me/api/portraits/women/10.jpg'
              },
              rating: 5,
              review: 'Absolutely delicious, the crust is perfect!',
              updatedAt: new Date().toISOString()
          }
      ]
  },
  {
      id: 2,
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
              id: 1,
              user: {
                  username: 'GourmetParis',
                  profile: 'https://randomuser.me/api/portraits/men/20.jpg'
              },
              rating: 5,
              review: 'Exquisite dining experience with a view!',
              updatedAt: new Date().toISOString()
          },
          {
              id: 2,
              user: {
                  username: 'CuisineLover',
                  profile: 'https://randomuser.me/api/portraits/women/20.jpg'
              },
              rating: 4,
              review: 'Amazing food, but a bit pricey.',
              updatedAt: new Date().toISOString()
          }
      ]
  },
  {
      id: 3,
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
              id: 1,
              user: {
                  username: 'DuckLover',
                  profile: 'https://randomuser.me/api/portraits/men/30.jpg'
              },
              rating: 4,
              review: 'Delicious Peking duck, a must-try!',
              updatedAt: new Date().toISOString()
          },
          {
              id: 2,
              user: {
                  username: 'FoodExplorer',
                  profile: 'https://randomuser.me/api/portraits/women/30.jpg'
              },
              rating: 4,
              review: 'Great experience, but the service could be better.',
              updatedAt: new Date().toISOString()
          }
      ]
  },
  {
      id: 4,
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
              id: 1,
              user: {
                  username: 'SpiceLover',
                  profile: 'https://randomuser.me/api/portraits/men/15.jpg'
              },
              rating: 5,
              review: 'Authentic and flavorful Mughlai dishes!',
              updatedAt: new Date().toISOString()
          },
          {
              id: 2,
              user: {
                  username: 'CultureEater',
                  profile: 'https://randomuser.me/api/portraits/women/15.jpg'
              },
              rating: 5,
              review: 'Rich flavors and a cultural experience.',
              updatedAt: new Date().toISOString()
          }
      ]
  },
  {
      id: 5,
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
              id: 1,
              user: {
                  username: 'PeruFoodie',
                  profile: 'https://randomuser.me/api/portraits/men/40.jpg'
              },
              rating: 5,
              review: 'Innovative dishes with local ingredients.',
              updatedAt: new Date().toISOString()
          },
          {
              id: 2,
              user: {
                  username: 'AdventureEater',
                  profile: 'https://randomuser.me/api/portraits/women/40.jpg'
              },
              rating: 5,
              review: 'A culinary adventure in every bite.',
              updatedAt: new Date().toISOString()
          }
      ]
  },
  {
      id: 6,
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
              id: 1,
              user: {
                  username: 'RomeGourmet',
                  profile: 'https://randomuser.me/api/portraits/men/50.jpg'
              },
              rating: 5,
              review: 'Elegant dining with breathtaking views.',
              updatedAt: new Date().toISOString()
          },
          {
              id: 2,
              user: {
                  username: 'FineDiner',
                  profile: 'https://randomuser.me/api/portraits/women/50.jpg'
              },
              rating: 5,
              review: 'A luxurious experience from start to finish.',
              updatedAt: new Date().toISOString()
          }
      ]
  },
  {
      id: 7,
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
              id: 1,
              user: {
                  username: 'SydneyFoodie',
                  profile: 'https://randomuser.me/api/portraits/men/60.jpg'
              },
              rating: 5,
              review: 'Creative dishes with a beautiful presentation.',
              updatedAt: new Date().toISOString()
          },
          {
              id: 2,
              user: {
                  username: 'HarborDiner',
                  profile: 'https://randomuser.me/api/portraits/women/60.jpg'
              },
              rating: 5,
              review: 'A perfect blend of flavors and scenery.',
              updatedAt: new Date().toISOString()
          }
      ]
  }
];

const events = [
  {
      id: 1,
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
              id: 1,
              user: {
                  username: 'FootballFan',
                  profile: 'https://randomuser.me/api/portraits/men/20.jpg'
              },
              rating: 5,
              review: 'Fantastic atmosphere and great matches!',
              updatedAt: new Date().toISOString()
          },
          {
              id: 2,
              user: {
                  username: 'SoccerLover',
                  profile: 'https://randomuser.me/api/portraits/women/20.jpg'
              },
              rating: 5,
              review: 'A must-attend for any football fan!',
              updatedAt: new Date().toISOString()
          }
      ]
  },
  {
      id: 2,
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
              id: 1,
              user: {
                  username: 'MusicLover',
                  profile: 'https://randomuser.me/api/portraits/men/30.jpg'
              },
              rating: 5,
              review: 'An unforgettable experience with amazing performances!',
              updatedAt: new Date().toISOString()
          },
          {
              id: 2,
              user: {
                  username: 'FestivalGoer',
                  profile: 'https://randomuser.me/api/portraits/women/30.jpg'
              },
              rating: 4,
              review: 'Great vibes and fantastic music!',
              updatedAt: new Date().toISOString()
          }
      ]
  },
  {
      id: 3,
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
              id: 1,
              user: {
                  username: 'ConcertLover',
                  profile: 'https://randomuser.me/api/portraits/men/40.jpg'
              },
              rating: 5,
              review: 'Enrique was amazing live!',
              updatedAt: new Date().toISOString()
          },
          {
              id: 2,
              user: {
                  username: 'MusicFan',
                  profile: 'https://randomuser.me/api/portraits/women/40.jpg'
              },
              rating: 5,
              review: 'One of the best concerts I have ever attended!',
              updatedAt: new Date().toISOString()
          }
      ]
  },
  {
      id: 4,
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
              id: 1,
              user: {
                  username: 'TechGuru',
                  profile: 'https://randomuser.me/api/portraits/men/50.jpg'
              },
              rating: 4,
              review: 'Very informative and well-organized.',
              updatedAt: new Date().toISOString()
          },
          {
              id: 2,
              user: {
                  username: 'Innovator123',
                  profile: 'https://randomuser.me/api/portraits/women/50.jpg'
              },
              rating: 4,
              review: 'Great speakers and interesting topics.',
              updatedAt: new Date().toISOString()
          }
      ]
  },
  {
      id: 5,
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
              id: 1,
              user: {
                  username: 'FilmBuff',
                  profile: 'https://randomuser.me/api/portraits/men/60.jpg'
              },
              rating: 5,
              review: 'A cinephile’s paradise with amazing film selections!',
              updatedAt: new Date().toISOString()
          },
          {
              id: 2,
              user: {
                  username: 'MovieLover',
                  profile: 'https://randomuser.me/api/portraits/women/60.jpg'
              },
              rating: 5,
              review: 'Incredible films and fantastic atmosphere.',
              updatedAt: new Date().toISOString()
          }
      ]
  },
  {
      id: 6,
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
              id: 1,
              user: {
                  username: 'BeerLover',
                  profile: 'https://randomuser.me/api/portraits/men/70.jpg'
              },
              rating: 5,
              review: 'The best festival ever! Great beer and amazing people.',
              updatedAt: new Date().toISOString()
          },
          {
              id: 2,
              user: {
                  username: 'FestivalFan',
                  profile: 'https://randomuser.me/api/portraits/women/70.jpg'
              },
              rating: 5,
              review: 'A wonderful experience, highly recommend attending!',
              updatedAt: new Date().toISOString()
          }
      ]
  }
];


async function populateData() {
  try {
    // await Attraction.deleteMany({});
    // await Attraction.insertMany(attractions);
    // console.log('Database populated with attractions data');
    // await Restaurant.deleteMany({});
    // await Restaurant.insertMany(restaurants);
    // console.log('Database populated with restaurant data');
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log('Database populated with event data');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error populating database', err);
  }
}
