const express = require('express');
const router = express.Router();
const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

router.get('/list-url', async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render('movie/list-view', {movies});
  } catch (err) {
    next(err);
  }
});

router.get('/create-url', (req, res, next) => {
  res.render('movie/create-view');
});

router.post('/create-url', async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create({
      title,
      genre, 
      plot,
      cast
    });
    res.redirect("/list-url");
  } catch (error) {
    next(error);
  }
});

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
		const { title, genre, plot, cast } = req.body;
		await Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true });
		res.redirect("/movie/list-url");
	} catch(error){
		next(error);
	}
});

router.post('/:id/delete-url', async (req, res, next) => {
  try {
		const { id } = req.params;
		await Movie.findByIdAndDelete(id);
    res.redirect("/movie/list-url");
	} catch (error) {
		next(error);
	}
});


router.get('/:id/details-url', async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate('cast');
    console.log(movie)
    res.render ('movie/details-view', movie);
  } catch(error){
    next(error);
  }
});

module.exports = router;