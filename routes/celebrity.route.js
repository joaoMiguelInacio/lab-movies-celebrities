const express = require('express');
const router = express.Router();
const Celebrity = require("../models/Celebrity.model.js");

router.get('/list-url', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('celebrity/list-view', {celebrities});
  } catch (err) {
    next(err);
  }
});

router.get('/create-url', (req, res, next) => {
  res.render('celebrity/create-view');
});

router.post('/create-url', async (req, res, next) => {
  try {
    const { name, occupation, catchphrase } = req.body;
    await Celebrity.create({
      name,
      occupation,
      catchphrase
    });
    res.redirect("/celebrity/list-url");
  } catch (error) {
    next(error);
  }
});

router.get('/:id/edit-url', async (req, res, next) => {
  try {
    const { id } = req.params;
    const celebrity = await Celebrity.findById (id);
    res.render ('celebrity/update-view', celebrity);
  } catch(error){
    next(error);
  }
});

router.post('/:id/edit-url', async (req, res, next) => {
  try {
		const { id } = req.params;
		const { name, occupation, catchphrase } = req.body;
		await Celebrity.findByIdAndUpdate(id, { name, occupation, catchphrase }, { new: true });
		res.redirect("/celebrity/list-url");
	} catch(error){
		next(error);
	}
});

router.post('/:id/delete-url', async (req, res, next) => {
  try {
		const { id } = req.params;
		await Celebrity.findByIdAndDelete(id);
    res.redirect("/celebrity/list-url");
	} catch (error) {
		next(error);
	}
});

module.exports = router;