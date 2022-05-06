const Movie = require("../models/movie.model.js");
const mongoose = require("mongoose");
require('../db');

const movies = [
    {
    title: "Titanic",
    genre: "Romance/Drama",
    plot: "Titanic is an epic, action-packed romance set against the ill-fated maiden voyage of the R.M.S. Titanic.",
    cast: [ "6274f3c76ac73c9d0903a446", "6274f3c76ac73c9d0903a447"]
    }
];

const movieSeed = async () => {
    try{
      await Movie.create(movies);
      console.log(`${movies.length} movies created`);
      await mongoose.connection.close();
      console.log(`Disconnected from Mongo`);
    } catch (error) {
      console.error(error);
    }
  };

  movieSeed();