// Import required modules



const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');


// Create a new Express application
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Create a PostgreSQL pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'your_database',
    password: 'Tiger',
    port: 5432,
});

// Define API endpoints

// Endpoint to retrieve 50 records from the "Details" table
app.get('/api/customer', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM customer LIMIT 50');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});