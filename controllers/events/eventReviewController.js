const Event = require('../../models/Event');
const User = require('../../models/User');

const addReview = async (req, res) => {
  const { placeId, userId, review, rating } = req.body;

  try {
    const event = await Event.findById(placeId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newReview = {
      user: user._id,
      rating,
      review,
      updatedAt: new Date()
    };

    event.reviews.push(newReview);

    event.rating = (
      (event.rating * event.reviewCount + rating) /
      (event.reviewCount + 1)
    ).toFixed(2);
    event.reviewCount += 1;

    await event.save();

    const updatedEvent = await Event.findById(placeId).populate('reviews.user');

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId, userId } = req.body;

  try {
    console.log(`Received request to delete review ID: ${reviewId} by user ID: ${userId}`);

    const event = await Event.findOne({ "reviews._id": reviewId });

    if (!event) {
      console.log(`Review not found for ID: ${reviewId}`);
      return res.status(404).json({ message: 'Review not found' });
    }

    const review = event.reviews.id(reviewId);

    if (review.user.toString() !== userId) {
      console.log('Unauthorized access');
      return res.status(403).json({ message: 'Unauthorized' });
    }

    event.reviews.pull(reviewId);

    if (event.reviewCount > 1) {
      event.rating = (
        (event.rating * event.reviewCount - review.rating) /
        (event.reviewCount - 1)
      ).toFixed(2);
    } else {
      event.rating = 0;
    }
    event.reviewCount -= 1;

    await event.save();

    console.log(`Review with ID: ${reviewId} deleted successfully`);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getReviews = async (req, res) => {
  const { placeId } = req.params;
  console.log(`Fetching reviews for event ID: ${placeId}`);

  try {
    const event = await Event.findById(placeId).populate('reviews.user');
    if (!event) {
      console.log(`Event with ID ${placeId} not found`);
      return res.status(404).json({ message: 'Event not found' });
    }

    console.log(`Found ${event.reviews.length} reviews for event ID: ${placeId}`);
    res.status(200).json(event.reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { addReview, deleteReview, getReviews };
