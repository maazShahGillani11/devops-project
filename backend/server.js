const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/devopsdb';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', ItemSchema);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});

app.delete('/api/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
