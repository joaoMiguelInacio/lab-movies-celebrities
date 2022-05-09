const { Schema, model } = require ('mongoose');

const reviewSchema = new Schema ({
    content: {
        type: String,
        maxlength: 250,
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId, ref: 'Movies',
        required: true
    }
});

const Review = model('Reviews', reviewSchema);

module.exports = Review;