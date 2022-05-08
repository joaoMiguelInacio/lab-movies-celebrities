const mongoose = require('../db');
const Review = require("../models/Review.model.js");
const reviews = require("../data/reviews-data.js");

const reviewSeed = async () => {
    try{
      await Review.create(reviews);
      console.log(`${reviews.length} reviews created`);
      await mongoose.connection.close();
      console.log(`Disconnected from Mongo`);
    } catch (error) {
      console.error(error);
    }
  };

  reviewSeed();
