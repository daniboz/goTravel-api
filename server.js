const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const searchRouter = require("./routes/search");
const attractionRouter = require("./routes/attractions/attraction");
const restaurantRouter = require("./routes/restaurants/restaurant");
const eventRouter = require("./routes/event");
const attractionReviewRouter = require('./routes/attractions/attractionReview');
const restaurantReviewRouter = require('./routes/restaurants/restaurantReview');
const errorHandler = require('./middleware/errorHandling');
const port = 5003;

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());

app.use('/api/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/attractions', attractionRouter);
app.use('/api/restaurants', restaurantRouter);
app.use('/api/events', eventRouter);
app.use('/api/reviews', attractionReviewRouter);
app.use('/api/restaurant-reviews', restaurantReviewRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
