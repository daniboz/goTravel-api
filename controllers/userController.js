const User = require('../models/User');
const CryptoJS = require('crypto-js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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
  const userId = req.user.id;

  try {
    const user = await User.findById(userId, 'username email profile isAdmin');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const { username, password } = req.body;
    let updatedFields = { username };

    if (password) {
      updatedFields.password = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();
    }

    if (req.file) {
      updatedFields.profile = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error during profile update:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getUserById, getCurrentUser, updateUser, upload };
