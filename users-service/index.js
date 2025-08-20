const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors());
app.use(bodyParser.json());
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// Endpoints

app.post('/users/register', async (req, res) => {
    const { username, password } = req.body;
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
    res.json({ message: 'User registered' });
});

app.post('/users/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE username=$1 ANDpassword=$2', [username, password]);
    if (result.rows.length) res.json({ message: 'Login successful' });
    else res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/health', (req, res) => res.json({ status: 'UP' }));

app.listen(5000, () => console.log('Users service running on port 5000'));