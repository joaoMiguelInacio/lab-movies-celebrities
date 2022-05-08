const {Schema, model} = require ('mongoose');

const celebritySchema = new Schema ({
    name: String,
    occupation: String,
    catchphrase: String
});

const Celebrity = model('Celebrities', celebritySchema);

module.exports = Celebrity;