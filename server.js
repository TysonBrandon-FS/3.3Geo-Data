require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const geoRoutes = require('./routes/geoRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use('/api', geoRoutes);

app.use((err) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 