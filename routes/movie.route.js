const express = require('express');
const router = express.Router();
const Movie = require("../models/Movie.model.js");
const Review = require("../models/Review.model.js");

//See List 1,2,3,4

router.get('/list-url', async (req, res, next) => {
  try {
    const movies = await Movie.find().sort( {"rating": -1} );
    res.render('movie/list-view', {movies});
  } catch (err) {
    next(err);
  }
});

router.get('/list-url-2', async (req, res, next) => {
  try {
    const movies = await Movie.find().sort( {"rating": 1} );
    res.render('movie/list-view-2', {movies});
  } catch (err) {
    next(err);
  }
});

router.get('/list-url-3', async (req, res, next) => {
  try {
    const movies = await Movie.find().sort( {"genre": 1} );
    res.render('movie/list-view-3', {movies});
  } catch (err) {
    next(err);
  }
});

router.get('/list-url-4', async (req, res, next) => {
  try {
    const movies = await Movie.find().sort( {"title": 1} );
    res.render('movie/list-view-4', {movies});
  } catch (err) {
    next(err);
  }
});

//Create Movie

router.get('/create-url', (req, res, next) => {
  res.render('movie/create-view');
});

router.post('/create-url', async (req, res, next) => {
  try {
    const { title, genre, plot, rating} = req.body;
    await Movie.create({
      title,
      genre, 
      plot,
      rating
    });
    res.redirect("/movie/list-url");
  } catch (error) {
    next(error);
  }
});

//Create Review

router.get('/:id/create-review-url', async(req, res, next) => {
  const {id} = req.params;
  const movie = await Movie.findById(id);
  res.render('movie/create-review-view', movie);
});

router.post('/:id/create-review-url', async (req, res, next) => {
  try{
      const { content } = req.body;
      const { id } = req.params;
      const newReview = await Review.create ({
         content: content,
         movie: id
      });
      const newReviewId = newReview._id;
      await Movie.findByIdAndUpdate(id, { $addToSet: { reviews: newReviewId } });
      res.redirect(`/movie/${id}/details-url`); 
  } catch (error) {
      next (error);
  }
});

//Edit Movie

router.get('/:id/edit-url', async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById (id);
    res.render ('movie/update-view', movie);
  } catch(error){
    next(error);
  }
});

router.post('/:id/edit-url', async (req, res, next) => {
  try {
		const { id } = req.params;
		const { title, genre, plot, rating } = req.body;
		await Movie.findByIdAndUpdate(id, { title, genre, plot, rating }, { new: true });
		res.redirect("/movie/list-url");
	} catch(error){
		next(error);
	}
});

//Delete Movie

router.post('/:id/delete-url', async (req, res, next) => {
  try {
		const { id } = req.params;
		await Movie.findByIdAndDelete(id);
    res.redirect("/movie/list-url");
	} catch (error) {
		next(error);
	}
});

//See Full details

router.get('/:id/details-url', async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate('cast').populate('reviews');
    res.render ('movie/details-view', movie);
  } catch(error){
    next(error);
  }
});

//Search for a movie

router.get('/movie-search', async (req, res, next) => {
  try {
    const movies = await Movie.find({title : req.query.movie});
    const searchedMovie = req.query.movie;
    if (movies.length >= 1){
      res.render('movie/list-view', {movies});
    } else {
      res.render('movie/not-found-view', {searchedMovie});
    }
  } catch (err) {
    next(err);
  }
});


module.exports = router;