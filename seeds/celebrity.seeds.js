const mongoose = require('../db');
const Celebrity = require ("../models/Celebrity.model.js");
const celebrities = require ("../data/celebrities-data");

const celebritySeed = async () => {
    try{
      await Celebrity.create(celebrities);
      console.log(`${celebrities.length} celebrities created`);
      await mongoose.connection.close();
      console.log(`Disconnected from Mongo`);
    } catch (error) {
      console.error(error);
    }
  };

  celebritySeed();