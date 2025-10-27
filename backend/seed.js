const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bloodLink', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB - bloodLink database for seeding'))
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

// Sample donor data
const sampleDonors = [
  {
    name: 'Aman Thahani',
    age: 19,
    gender: 'male',
    bloodGroup: 'O+',
    email: 'amanthahani@gmail.com',
    phone: '0734567897',
    address: 'abcd',
    city: 'efgh',
    state: 'Kerala',
    medicalConditions: 'None',
    donationHistory: 'First time donor',
    status: 'active'
  },
  {
    name: 'Nabhan V Nazar',
    age: 22,
    gender: 'male',
    bloodGroup: 'A+',
    email: 'nabhanvnazar@gmail.com',
    phone: '0987654321',
    address: 'xyz street',
    city: 'Kochi',
    state: 'Kerala',
    medicalConditions: 'None',
    donationHistory: 'Regular donor',
    status: 'active'
  },
  {
    name: 'Sarah Johnson',
    age: 25,
    gender: 'female',
    bloodGroup: 'B-',
    email: 'sarah.johnson@email.com',
    phone: '0555123456',
    address: '456 Oak Avenue',
    city: 'Trivandrum',
    state: 'Kerala',
    medicalConditions: 'None',
    donationHistory: '2 previous donations',
    status: 'active'
  },
  {
    name: 'Rajesh Kumar',
    age: 30,
    gender: 'male',
    bloodGroup: 'AB+',
    email: 'rajesh.kumar@email.com',
    phone: '0444987654',
    address: '789 Pine Road',
    city: 'Calicut',
    state: 'Kerala',
    medicalConditions: 'None',
    donationHistory: '3 previous donations',
    status: 'active'
  },
  {
    name: 'Priya Menon',
    age: 28,
    gender: 'female',
    bloodGroup: 'O-',
    email: 'priya.menon@email.com',
    phone: '0333876543',
    address: '321 Maple Street',
    city: 'Thrissur',
    state: 'Kerala',
    medicalConditions: 'None',
    donationHistory: '1 previous donation',
    status: 'active'
  }
];

// Seed function
async function seedDatabase() {
  try {
    // Clear existing donors
    await Donor.deleteMany({});
    console.log('Cleared existing donor data');

    // Insert sample donors
    const insertedDonors = await Donor.insertMany(sampleDonors);
    console.log(`Successfully seeded ${insertedDonors.length} donors`);

    // Display inserted data
    console.log('\nSeeded Donors:');
    insertedDonors.forEach((donor, index) => {
      console.log(`${index + 1}. ${donor.name} - ${donor.bloodGroup} - ${donor.city}, ${donor.state}`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed function
seedDatabase();
