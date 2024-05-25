const User = require('../models/User');

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id, 'username profile');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getCurrentUser = async (req, res) => {
  const userId = req.user.id; // Assuming the user ID is stored in req.user by the auth middleware

  try {
    const user = await User.findById(userId, 'username email profile isAdmin'); // Adjust fields as needed
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getUserById, getCurrentUser };
