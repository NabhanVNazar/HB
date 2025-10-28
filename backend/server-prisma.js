const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('../node_modules/@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running with Prisma' });
});

app.get('/api/welcome', (req, res) => {
  res.json({ message: 'Welcome to LifeLink Backend with Prisma!' });
});

app.post('/api/donors', async (req, res) => {
  try {
    const donorData = {
      name: req.body.name,
      age: parseInt(req.body.age),
      gender: req.body.gender,
      bloodGroup: req.body.bloodGroup,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      medicalConditions: req.body.medicalConditions || 'None',
      donationHistory: req.body.donationHistory || 'First time',
      location: req.body.location || '',
      status: 'active'
    };

    const donor = await prisma.donor.create({
      data: donorData
    });

    res.status(201).json({ 
      message: 'Donor registered successfully', 
      donor 
    });
  } catch (error) {
    console.error('Error saving donor:', error);
    res.status(400).json({ 
      error: 'Failed to register donor', 
      details: error.message 
    });
  }
});

app.get('/api/donors', async (req, res) => {
  try {
    const donors = await prisma.donor.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(donors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
});

app.get('/api/donors/:id', async (req, res) => {
  try {
    const donor = await prisma.donor.findUnique({
      where: { id: req.params.id }
    });
    
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }
    
    res.json(donor);
  } catch (error) {
    console.error('Error fetching donor:', error);
    res.status(500).json({ error: 'Failed to fetch donor' });
  }
});

app.patch('/api/donors/:id', async (req, res) => {
  try {
    const donor = await prisma.donor.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(donor);
  } catch (error) {
    console.error('Error updating donor:', error);
    res.status(500).json({ error: 'Failed to update donor' });
  }
});

app.get('/api/blood-requests', async (req, res) => {
  try {
    const requests = await prisma.bloodRequest.findMany({
      include: {
        hospital: true,
        matches: {
          include: {
            donor: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching blood requests:', error);
    res.status(500).json({ error: 'Failed to fetch blood requests' });
  }
});

app.post('/api/match-donors', async (req, res) => {
  try {
    const { requestId } = req.body;
    
    const request = await prisma.bloodRequest.findUnique({
      where: { id: requestId }
    });

    if (!request) {
      return res.status(404).json({ error: 'Blood request not found' });
    }

    const allDonors = await prisma.donor.findMany({
      where: { status: 'active' }
    });

    const bloodTypeMap = {
      'A+': 'A_POSITIVE', 'A-': 'A_NEGATIVE',
      'B+': 'B_POSITIVE', 'B-': 'B_NEGATIVE',
      'AB+': 'AB_POSITIVE', 'AB-': 'AB_NEGATIVE',
      'O+': 'O_POSITIVE', 'O-': 'O_NEGATIVE'
    };

    const matchedDonors = allDonors.map(donor => {
      let score = 0;
      
      const donorBloodType = bloodTypeMap[donor.bloodGroup] || donor.bloodGroup;
      if (donorBloodType === request.bloodType) {
        score += 50;
      }
      
      if (donor.city.toLowerCase() === request.hospital?.city?.toLowerCase()) {
        score += 30;
      }
      
      if (donor.donationHistory && donor.donationHistory !== 'First time') {
        score += 10;
      }
      
      const age = donor.age;
      if (age >= 25 && age <= 45) {
        score += 10;
      }

      return {
        donor,
        score: Math.min(score, 100)
      };
    }).filter(match => match.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    res.json({
      request,
      matches: matchedDonors
    });
  } catch (error) {
    console.error('Error matching donors:', error);
    res.status(500).json({ error: 'Failed to match donors' });
  }
});

app.listen(PORT, 'localhost', () => {
  console.log(`🚀 LifeLink Backend running on localhost:${PORT}`);
  console.log(`📊 Using Prisma with SQLite database`);
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
