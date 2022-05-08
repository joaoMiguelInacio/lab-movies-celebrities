const express = require('express');
const router = express.Router();
const Review = require("../models/Review.model.js");


router.get('/list-url', async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('movie');
    res.render('review/list-view', {reviews});
  } catch (err) {
    next(err);
  }
});

router.get('/:id/edit-url', async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById (id);
    res.render ('review/update-view', review);
  } catch(error){
    next(error);
  }
});

router.post('/:id/edit-url', async (req, res, next) => {
  try {
		const { id } = req.params;
		const { content } = req.body;
		await Review.findByIdAndUpdate(id, { content }, { new: true });
		res.redirect("/review/list-url");
	} catch(error){
		next(error);
	}
});

router.post('/:id/delete-url', async (req, res, next) => {
  try {
		const { id } = req.params;
		await Review.findByIdAndDelete(id);
    res.redirect("/review/list-url");
	} catch (error) {
		next(error);
	}
});

module.exports = router;