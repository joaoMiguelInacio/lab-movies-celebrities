const {Schema, model} = require ('mongoose');

const movieSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    plot: String,
    rating: Number,
    cast: [{type: Schema.Types.ObjectId, ref: 'Celebrities' }],
    reviews: [{type: Schema.Types.ObjectId, ref: 'Reviews' }]
});

const Movie = model('Movies', movieSchema);

module.exports = Movie;