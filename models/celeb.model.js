const {Schema, model} = require ('mongoose');

const celebSchema = new Schema ({
    name: String,
    occupation: String,
    catchphrase: String
});

const Celeb = model('Celebs', celebSchema);

module.exports = Celeb;