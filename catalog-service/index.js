const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
app.get('/catalog/items', async (req, res) => {
const result = await pool.query('SELECT * FROM items');
res.json(result.rows);
});
app.get('/health', (req, res) => res.json({ status: 'UP' }));
app.listen(5000, () => console.log('Catalog service running on port 5000'));

