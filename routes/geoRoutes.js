const express = require('express');
const router = express.Router();
const geoController = require('../controllers/geoController');

router.get('/geo-data/all', geoController.getAllGeoData); 
router.get('/geo-data/:id', geoController.getGeoDataById);   
router.post('/geo-data', geoController.saveGeoData);
router.get('/geo-data', geoController.getWeatherData); 
    

module.exports = router; 