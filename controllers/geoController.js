const GeoData = require('../models/GeoData');
const fetch = require('node-fetch');


const getWeatherData = async (req, res) => {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
        return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`)
        .then((response) => response.json())
        .then((data) => res.json(data))
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            res.status(500).json({ message: "Error fetching weather data" });
        });
};

const saveGeoData = async (req, res) => {
    try {
        const geoData = new GeoData({
            location: {
                lat: req.body.lat,
                lon: req.body.lon
            },
            weather: {
                temperature: req.body.temperature,
                humidity: req.body.humidity,
                description: req.body.description,
                windSpeed: req.body.windSpeed
            }
        });

        const savedData = await geoData.save();
        res.status(201).json({
            message: 'Data saved successfully',
            id: savedData._id
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getAllGeoData = async (req, res) => {
    try {
        const { startDate, endDate, lat, lon } = req.query;
        let query = {};


        if (startDate && endDate) {
            query.timestamp = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        if (lat && lon) {
            query['location.lat'] = lat;
            query['location.lon'] = lon;
        }

        const geoData = await GeoData.find(query);
        res.json(geoData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGeoDataById = async (req, res) => {
    try {
        const geoData = await GeoData.findById(req.params.id);
        
        if (!geoData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        
        const response = {
            id: geoData._id.toString(),  
            weather: {
                temperature: geoData.weather.temperature,
                humidity: geoData.weather.humidity,
                description: geoData.weather.description,
                windSpeed: geoData.weather.windSpeed
            },
            location: {
                lat: geoData.location.lat,
                lon: geoData.location.lon
            },
            timestamp: geoData.timestamp
        };

        res.json(response);
        console.log("from control", response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getWeatherData,
    saveGeoData,
    getAllGeoData,
    getGeoDataById
}; 