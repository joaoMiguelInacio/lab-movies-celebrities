const { Schema, model } = require ('mongoose');

const reviewSchema = new Schema ({
    content: {
        type: String,
        maxlength: 250,
        required: true
    },
    movie: String
    // {type: Schema.Types.ObjectId, ref: 'Movie' }
});

const Review = model('Reviews', reviewSchema);

module.exports = Review;