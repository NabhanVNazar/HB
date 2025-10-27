const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bloodLink', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB - bloodLink database'))
.catch(err => console.error('MongoDB connection error:', err));

// Donor Schema
const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 65 },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  medicalConditions: { type: String, required: true },
  donationHistory: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Donor = mongoose.model('Donor', donorSchema);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

app.get('/api/welcome', (req, res) => {
  console.log(`Request received: ${req.method} ${req.path}`);
  res.json({ message: 'Welcome to the Node.js Backend!' });
});

// Donor routes
app.post('/api/donors', async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ message: 'Donor registered successfully', donor });
  } catch (error) {
    console.error('Error saving donor:', error);
    res.status(400).json({ error: 'Failed to register donor', details: error.message });
  }
});

app.get('/api/donors', async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
});

app.patch('/api/donors/:id', async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }
    res.json(donor);
  } catch (error) {
    console.error('Error updating donor:', error);
    res.status(500).json({ error: 'Failed to update donor' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
