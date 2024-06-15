const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const searchRouter = require("./routes/search");
const attractionRouter = require("./routes/attractions/attraction");
const restaurantRouter = require("./routes/restaurants/restaurant");
const eventRouter = require("./routes/events/event");
const attractionReviewRouter = require('./routes/attractions/attractionReview');
const restaurantReviewRouter = require('./routes/restaurants/restaurantReview');
const eventReviewRouter = require('./routes/events/eventReview');
const calendarEntryRouter = require('./routes/calendarEntry');
const errorHandler = require('./middleware/errorHandling');
const port = 5003;

dotenv.config();

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/attractions', attractionRouter);
app.use('/api/restaurants', restaurantRouter);
app.use('/api/events', eventRouter);
app.use('/api/attraction-reviews', attractionReviewRouter);
app.use('/api/restaurant-reviews', restaurantReviewRouter);
app.use('/api/event-reviews', eventReviewRouter);
app.use('/api/calendar-entries', calendarEntryRouter);

app.post('/api/upload', upload.single('profile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log('Uploaded file details:', req.file);

  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File not found:', err);
      return res.status(500).send('Server error: File not found after upload.');
    }

    res.send({
      message: 'File uploaded successfully',
      fileUrl: `http://localhost:${port}/uploads/${req.file.filename}`
    });
  });
});

app.put('/api/users/me', upload.single('profile'), async (req, res) => {
  const { username, password } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const user = await User.findById(req.user.id);
    user.username = username || user.username;
    if (password) user.password = password;
    if (profileImage) user.profile = profileImage;

    await user.save();
    res.send({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error during profile update:', error);
    res.status(500).send('Server error');
  }
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;
