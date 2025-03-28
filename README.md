# Geos Data API Project

This project demonstrates the integration of OpenWeatherMap's API with a MongoDB backend using CRUD opperations that handles geo data. The app use Node.js and Express to fetch real-time weather data based on coordinates, store it in a database, and retrieve it through endpoints. 

## Technical Implementation
We use MongoDB schema for data validation, we implement error handling, and follows CRUD for its API endpoints. Key endpoints include GET `/api/geo-data?lat={latitude}&lon={longitude}` for fetching current weather data, POST `/api/geo-data` for storing weather information, and GET `/api/geo-data/all` for getting all the stored data. 

Dependencies:
- Node.js & Express
- MongoDB & Mongoose
- dotenv
- node-fetch

API Documentation: https://openweathermap.org/api
