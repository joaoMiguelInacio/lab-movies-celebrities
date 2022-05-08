const { Schema, model } = require ('mongoose');

const reviewSchema = new Schema ({
    content: {
        type: String,
        maxlength: 250
    }
});

const Review = model('Reviews', reviewSchema);

module.exports = Review;