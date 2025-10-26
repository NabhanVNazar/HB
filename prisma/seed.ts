import { PrismaClient } from '../lib/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample users
  const donorUser = await prisma.user.create({
    data: {
      email: 'john.donor@example.com',
      password: '$2b$10$hashedpassword', // In real app, hash properly
      role: 'DONOR',
    },
  });

  const hospitalUser = await prisma.user.create({
    data: {
      email: 'hospital@example.com',
      password: '$2b$10$hashedpassword', // In real app, hash properly
      role: 'HOSPITAL',
    },
  });

  // Create donor profile
  const donorProfile = await prisma.donorProfile.create({
    data: {
      userId: donorUser.id,
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      bloodType: 'O_POSITIVE',
      phone: '+1234567890',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      emergencyContact: 'Jane Doe: +0987654321',
      medicalHistory: 'No significant medical history',
    },
  });

  // Create hospital profile
  const hospitalProfile = await prisma.hospitalProfile.create({
    data: {
      userId: hospitalUser.id,
      name: 'General Hospital',
      address: '456 Hospital Ave',
      city: 'Medical City',
      state: 'CA',
      zipCode: '67890',
      phone: '+1122334455',
      email: 'admin@generalhospital.com',
      licenseNumber: 'LIC123456',
      isVerified: true,
    },
  });

  // Create sample donation
  await prisma.donation.create({
    data: {
      donorId: donorProfile.id,
      bloodType: 'O_POSITIVE',
      quantity: 450,
      donationDate: new Date(),
      location: 'General Hospital',
      status: 'COMPLETED',
      notes: 'First donation',
    },
  });

  // Create sample blood request
  const bloodRequest = await prisma.bloodRequest.create({
    data: {
      hospitalId: hospitalProfile.id,
      bloodType: 'O_POSITIVE',
      quantity: 500,
      urgency: 'HIGH',
      reason: 'Emergency surgery',
      status: 'PENDING',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
  });

  // Create AI match
  await prisma.match.create({
    data: {
      requestId: bloodRequest.id,
      donorId: donorProfile.id,
      score: 95.5,
      status: 'PENDING',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
