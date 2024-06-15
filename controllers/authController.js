const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { username, email, password, isAdmin } = req.body;

      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(409).json({ status: false, message: "Username or email already exists" });
      }

      const newUser = new User({
        username,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.SECRET).toString(),
        isAdmin
      });

      await newUser.save();

      const userToken = jwt.sign(
        {
          id: newUser._id,
          isAdmin: newUser.isAdmin
        },
        process.env.JWT_SECRET,
        { expiresIn: "210d" }
      );

      res.status(201).json({ status: true, message: "User successfully created", token: userToken });
    } catch (error) {
      return next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { usernameOrEmail, password } = req.body;
      console.log('Login request received with data:', req.body);

      const user = await User.findOne({
        $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
      });
      console.log('User found:', user);

      if (!user) {
        console.log('User not found');
        return res.status(401).json({ status: false, message: "User not found" });
      }

      const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
      const decryptedString = decryptedPassword.toString(CryptoJS.enc.Utf8);
      console.log('Decrypted password:', decryptedString);

      if (decryptedString !== password) {
        console.log('Wrong password');
        return res.status(401).json({ status: false, message: "Wrong password" });
      }

      const userToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET,
        { expiresIn: "210d" }
      );

      console.log('User authenticated, token generated:', userToken);
      res.status(200).json({ status: true, id: user._id, token: userToken, isAdmin: user.isAdmin });
    } catch (error) {
      console.error('Error during login:', error);
      return next(error);
    }
  }
};
