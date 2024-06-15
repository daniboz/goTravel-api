const Attraction = require('../../models/Attraction');
const User = require('../../models/User');

const addReview = async (req, res) => {
  const { placeId, userId, review, rating } = req.body;

  try {
    const attraction = await Attraction.findById(placeId);
    if (!attraction) {
      return res.status(404).json({ message: 'Attraction not found' });
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

    attraction.reviews.push(newReview);

    attraction.rating = (
      (attraction.rating * attraction.reviewCount + rating) /
      (attraction.reviewCount + 1)
    ).toFixed(2);
    attraction.reviewCount += 1;

    await attraction.save();

    const updatedAttraction = await Attraction.findById(placeId).populate('reviews.user');

    res.status(200).json(updatedAttraction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId, userId } = req.body;

  try {
    const attraction = await Attraction.findOne({ "reviews._id": reviewId });

    if (!attraction) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const review = attraction.reviews.id(reviewId);

    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    attraction.reviews.pull(reviewId);

    if (attraction.reviewCount > 1) {
      attraction.rating = (
        (attraction.rating * attraction.reviewCount - review.rating) /
        (attraction.reviewCount - 1)
      ).toFixed(2);
    } else {
      attraction.rating = 0;
    }
    attraction.reviewCount -= 1;

    await attraction.save();

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getReviews = async (req, res) => {
  const { placeId } = req.params;
  console.log(`Fetching reviews for attraction ID: ${placeId}`);

  try {
    const attraction = await Attraction.findById(placeId).populate('reviews.user');
    if (!attraction) {
      console.log(`Attraction with ID ${placeId} not found`);
      return res.status(404).json({ message: 'Attraction not found' });
    }

    console.log(`Found ${attraction.reviews.length} reviews for attraction ID: ${placeId}`);
    res.status(200).json(attraction.reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = { addReview, deleteReview, getReviews };
