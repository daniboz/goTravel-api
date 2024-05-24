const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('../../models/Restaurant'); // Update the path as necessary
const User = require('../../models/User'); // Update the path as necessary

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(async () => {
  console.log('Connected to MongoDB');
  await migrateData();
  mongoose.connection.close();
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

async function migrateData() {
  try {
    const restaurants = await Restaurant.find();

    for (let restaurant of restaurants) {
      let reviewsUpdated = false;
      for (let review of restaurant.reviews) {
        if (review.user && review.user.username) {
          const user = await User.findOne({ username: review.user.username });
          if (user) {
            review.user = user._id;
            reviewsUpdated = true;
          } else {
            console.log(`User not found for review: ${review}`);
          }
        } else {
          console.log(`Review with missing user: ${review}`);
        }
      }
      if (reviewsUpdated) {
        await restaurant.save();
      }
    }
    console.log('Data migration complete');
  } catch (err) {
    console.error('Error migrating data', err);
  }
}
