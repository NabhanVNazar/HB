const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Arjun', 'Sai', 'Ishaan', 'Ayaan', 'Krishna', 'Rohan', 'Advait',
  'Ananya', 'Diya', 'Aadhya', 'Saanvi', 'Sara', 'Isha', 'Anika', 'Myra', 'Kiara', 'Pari',
  'Rajesh', 'Suresh', 'Ramesh', 'Mahesh', 'Ganesh', 'Dinesh', 'Prakash', 'Amit', 'Sumit', 'Rohit',
  'Priya', 'Pooja', 'Anjali', 'Sneha', 'Kavita', 'Deepika', 'Neha', 'Riya', 'Shruti', 'Divya',
  'Aryan', 'Kabir', 'Dhruv', 'Atharv', 'Vihaan', 'Reyansh', 'Shivansh', 'Aayush', 'Om', 'Dev',
  'Avni', 'Navya', 'Tara', 'Aarohi', 'Aditi', 'Riya', 'Shanaya', 'Aisha', 'Zara', 'Mira'
];

const lastNames = [
  'Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Reddy', 'Rao', 'Nair', 'Iyer',
  'Mehta', 'Joshi', 'Desai', 'Shah', 'Agarwal', 'Bansal', 'Malhotra', 'Kapoor', 'Chopra', 'Bhatia',
  'Thakur', 'Pandey', 'Mishra', 'Jain', 'Sinha', 'Saxena', 'Arora', 'Khanna', 'Sethi', 'Bose',
  'Das', 'Dutta', 'Ghosh', 'Roy', 'Sen', 'Chatterjee', 'Mukherjee', 'Banerjee', 'Bhattacharya'
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genders = ['male', 'female', 'other'];
const donationHistories = ['First time', 'Regular donor', 'Frequent donor', 'Occasional donor'];

const indianStates = [
  'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Gujarat', 'Rajasthan', 
  'Uttar Pradesh', 'Delhi', 'West Bengal', 'Telangana', 'Andhra Pradesh', 
  'Punjab', 'Haryana', 'Madhya Pradesh', 'Bihar', 'Odisha'
];

const cities = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem'],
  'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kannur'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Allahabad'],
  'Delhi': ['New Delhi', 'Delhi'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati'],
  'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
  'Haryana': ['Gurgaon', 'Faridabad', 'Panipat', 'Ambala', 'Hisar'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri', 'Brahmapur']
};

const medicalConditions = [
  'None', 'None', 'None', 'None', 'None',
  'Controlled diabetes', 'Mild hypertension', 'Asthma (controlled)',
  'Thyroid disorder (controlled)', 'Allergies (seasonal)'
];

const streets = [
  'MG Road', 'Park Street', 'Brigade Road', 'Anna Salai', 'Residency Road',
  'Church Street', 'Station Road', 'Main Street', 'Gandhi Nagar', 'Nehru Place',
  'Rajpath', 'Mall Road', 'Civil Lines', 'Model Town', 'Sector'
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateEmail(firstName, lastName) {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  const cleanFirst = firstName.toLowerCase().replace(/\s/g, '');
  const cleanLast = lastName.toLowerCase().replace(/\s/g, '');
  const num = Math.floor(Math.random() * 999);
  return `${cleanFirst}.${cleanLast}${num}@${getRandomElement(domains)}`;
}

function generatePhone() {
  const prefixes = ['98', '99', '97', '96', '95', '94', '93', '92', '91', '90'];
  return `${getRandomElement(prefixes)}${Math.floor(10000000 + Math.random() * 90000000)}`;
}

async function main() {
  console.log('🌱 Starting to seed 200 donors...');

  const donors = [];
  
  for (let i = 0; i < 200; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const name = `${firstName} ${lastName}`;
    const state = getRandomElement(indianStates);
    const city = getRandomElement(cities[state]);
    const age = 18 + Math.floor(Math.random() * 47);
    
    const donor = {
      name,
      age,
      gender: getRandomElement(genders),
      bloodGroup: getRandomElement(bloodGroups),
      email: generateEmail(firstName, lastName),
      phone: generatePhone(),
      address: `${Math.floor(Math.random() * 999) + 1} ${getRandomElement(streets)}`,
      city,
      state,
      medicalConditions: getRandomElement(medicalConditions),
      donationHistory: getRandomElement(donationHistories),
      location: `${city}, ${state}`,
      status: 'active'
    };
    
    donors.push(donor);
  }

  let created = 0;
  for (const donor of donors) {
    try {
      await prisma.donor.create({ data: donor });
      created++;
      if (created % 20 === 0) {
        console.log(`✅ Created ${created}/200 donors...`);
      }
    } catch (error) {
      console.error(`❌ Failed to create donor: ${donor.name}`, error.message);
    }
  }

  console.log(`\n🎉 Successfully seeded ${created} donors!`);
  
  const totalDonors = await prisma.donor.count();
  console.log(`📊 Total donors in database: ${totalDonors}`);
  
  const bloodGroupStats = await prisma.donor.groupBy({
    by: ['bloodGroup'],
    _count: true
  });
  
  console.log('\n🩸 Blood Group Distribution:');
  bloodGroupStats.forEach(stat => {
    console.log(`   ${stat.bloodGroup}: ${stat._count}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
