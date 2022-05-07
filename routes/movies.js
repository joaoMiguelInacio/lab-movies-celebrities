const express = require('express');
const router = express.Router();
const Movies = require("../models/movie.model.js");

router.get('/list', async (req, res, next) => {
  try {
    const movies = await Movies.find();
    res.render('movie/list', {movies});
  } catch (err) {
    next(err);
  }
});

router.get('/create', (req, res, next) => {
  res.render('movie/create-form');
});

router.post('/create', async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movies.create({
      title,
      genre, 
      plot,
      cast
    });
    res.redirect("/list");
  } catch (error) {
    next(error);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movies.findById (id);
    res.render ('movie/update-form', movie);
  } catch(error){
    next(error);
  }
});

router.post('/:id/edit', async (req, res, next) => {
  try {
		const { id } = req.params;
		const { title, genre, plot, cast } = req.body;
		await Movies.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true });
		res.redirect("/movie/list");
	} catch(error){
		next(error);
	}
});

router.post('/:id/delete', async (req, res, next) => {
  try {
		const { id } = req.params;
		await Movies.findByIdAndDelete(id);
    res.redirect("/movie/list");
	} catch (error) {
		next(error);
	}
});


router.get('/:id/details', async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movies.findById(id).populate('cast');
    console.log(movie)
    res.render ('movie/details', movie);
  } catch(error){
    next(error);
  }
});

module.exports = router;