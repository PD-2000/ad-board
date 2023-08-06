const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller');

router.get('/ads', adsController.getAll);
router.get('/ads/:id', adsController.getById);
router.get('/ads/search/:searchPhrase', adsController.getSearched);
router.post('/ads', adsController.postAll);
router.put('/ads/:id', adsController.putById);
router.delete('/ads/:id', adsController.deleteById);

module.exports = router;