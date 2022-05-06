const express = require('express');
const router = express.Router();
const Celeb = require("../models/celeb.model.js");

router.get('/celeb/list', async (req, res, next) => {
  try {
    const celebs = await Celeb.find();
    console.log(celebs)
    res.render('celeb/list', {celebs});
  } catch (err) {
    next(err);
  }
});

router.get('/celeb/create', (req, res, next) => {
  res.render('celeb/create-form');
});

router.post('/celeb/create', async (req, res, next) => {
  try {
    const { name, occupation, catchphrase } = req.body;
    await Celeb.create({
      name,
      occupation,
      catchphrase
    });
    res.redirect("/celeb/list");
  } catch (error) {
    next(error);
  }
});

router.get('/celeb/:id/edit', async (req, res, next) => {
  try {
    const { id } = req.params;
    const celeb = await Celeb.findById (id);
    res.render ('celeb/update-form', celeb);
  } catch(error){
    next(error);
  }
});

router.post('/celeb/:id/edit', async (req, res, next) => {
  try {
		const { id } = req.params;
		const { name, occupation, catchphrase } = req.body;
		await Celeb.findByIdAndUpdate(id, { name, occupation, catchphrase }, { new: true });
		res.redirect("/celeb/list");
	} catch(error){
		next(error);
	}
});

router.post('/celeb/:id/delete', async (req, res, next) => {
  try {
		const { id } = req.params;
		await Celeb.findByIdAndDelete(id);
    res.redirect("/celeb/list");
	} catch (error) {
		next(error);
	}
});

module.exports = router;