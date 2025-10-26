-- CreateTable
CREATE TABLE "users" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'DONOR',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "donor_profiles" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "bloodType" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "emergencyContact" TEXT NOT NULL,
    "medicalHistory" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "donor_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "hospital_profiles" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "hospital_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "donations" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "donorId" TEXT NOT NULL,
    "bloodType" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "donationDate" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "donations_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "donor_profiles" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "blood_requests" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "hospitalId" TEXT NOT NULL,
    "bloodType" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "urgency" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "deadline" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "blood_requests_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital_profiles" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "matches" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "requestId" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "matches_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "blood_requests" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "matches_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "donor_profiles" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "donor_profiles_userId_key" ON "donor_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "hospital_profiles_userId_key" ON "hospital_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "hospital_profiles_licenseNumber_key" ON "hospital_profiles"("licenseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "matches_requestId_donorId_key" ON "matches"("requestId", "donorId");
