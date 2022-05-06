const Celeb = require("../models/celeb.model.js");
const mongoose = require("mongoose");
require('../db');

const celebs = [
    {
    name: "Leonardo DiCaprio",
    occupation: "Actor",
    catchphrase: "I'm the king of the world!"
    }, 
    {
    name: "Kate Winslet",
    occupation: "Actress",
    catchphrase: "Draw me like one of your French girls."
    }
];

const celebSeed = async () => {
    try{
      await Celeb.create(celebs);
      console.log(`${celebs.length} celebrities created`);
      await mongoose.connection.close();
      console.log(`Disconnected from Mongo`);
    } catch (error) {
      console.error(error);
    }
  };

  celebSeed();