const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:123@postgres:5432/catalogdb'
});


// ==================== ROTAS ====================

// Health check
app.get('/health', (req, res) => res.json({ status: 'UP' }));

// Listar itens
app.get('/catalog/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adicionar item
app.post('/catalog/items', async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const result = await pool.query(
      'INSERT INTO items (name, price, stock) VALUES ($1, $2, $3) RETURNING *',
      [name, price, stock]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar estoque
app.put('/catalog/items/:id/stock', async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const result = await pool.query(
      'UPDATE items SET stock = $1 WHERE id = $2 RETURNING *',
      [stock, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== INICIAR SERVIDOR ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Catalog service running on port ${PORT}`);
});

