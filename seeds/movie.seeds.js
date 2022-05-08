const mongoose = require('../db');
const Movie = require ("../models/Movie.model.js");
const movies = require ("../data/movies-data");

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