const Restaurant = require('../../models/Restaurant');
const User = require('../../models/User');

const addReview = async (req, res) => {
  const { placeId, userId, review, rating } = req.body;

  try {
    const restaurant = await Restaurant.findById(placeId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newReview = {
      user: user._id,
      rating,
      review
    };

    restaurant.reviews.push(newReview);

    // Update the average rating and review count
    restaurant.rating = (
      (restaurant.rating * restaurant.reviewCount + rating) /
      (restaurant.reviewCount + 1)
    ).toFixed(2);
    restaurant.reviewCount += 1;

    await restaurant.save();

    const updatedRestaurant = await Restaurant.findById(placeId).populate('reviews.user');

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteReview = async (req, res) => {
    const { reviewId, userId } = req.body;
  
    try {
      console.log(`Received request to delete review ID: ${reviewId} by user ID: ${userId}`);
  
      const restaurant = await Restaurant.findOne({ "reviews._id": reviewId });
  
      if (!restaurant) {
        console.log(`Review not found for ID: ${reviewId}`);
        return res.status(404).json({ message: 'Review not found' });
      }
  
      const review = restaurant.reviews.id(reviewId);
  
      if (review.user.toString() !== userId) {
        console.log('Unauthorized access');
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      // Remove the review
      restaurant.reviews.pull(reviewId);
  
      // Update the average rating and review count
      if (restaurant.reviewCount > 1) {
        restaurant.rating = (
          (restaurant.rating * restaurant.reviewCount - review.rating) /
          (restaurant.reviewCount - 1)
        ).toFixed(2);
      } else {
        restaurant.rating = 0;
      }
      restaurant.reviewCount -= 1;
  
      await restaurant.save();
  
      console.log(`Review with ID: ${reviewId} deleted successfully`);
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };  
  

const getReviews = async (req, res) => {
    const { placeId } = req.params;
    console.log(`Fetching reviews for restaurant ID: ${placeId}`);
  
    try {
      const restaurant = await Restaurant.findById(placeId).populate('reviews.user');
      if (!restaurant) {
        console.log(`Restaurant with ID ${placeId} not found`);
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      console.log(`Found ${restaurant.reviews.length} reviews for restaurant ID: ${placeId}`);
      res.status(200).json(restaurant.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };

module.exports = { addReview, deleteReview, getReviews };
