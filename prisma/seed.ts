import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a Hospital
  const hospital = await prisma.hospital.create({
    data: {
      name: 'Green Valley Hospital',
      location: 'Suburbia',
      phoneNumber: '987-654-3210',
    },
  });

  const hospital2 = await prisma.hospital.create({
    data: {
      name: 'Racoon City Hospital',
      location: 'Downwotn',
      phoneNumber: '543-631-3210',
    },
  });

  // Create a Doctor
  const doctor = await prisma.doctor.create({
    data: {
      username: 'dr.marysmith',
      password: 'securepassword',
      name: 'Dr. Mary Smith',
      specialization: 'Neurology',
      email: 'mary.smith@example.com',
      phoneNumber: '222-444-6666',
      hospitalIds: [hospital.id], // Assign hospital ID as an array
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      username: 'dr.janedoe',
      password: 'securepassword',
      name: 'Dr. Jane Doe',
      specialization: 'Cardiovascular',
      email: 'jane.doe@example.com',
      phoneNumber: '222-554-6216',
      hospitalIds: [hospital2.id], // Assign hospital ID as an array
    },
  });

  // Create a Nurse
  const nurse = await prisma.nurse.create({
    data: {
      name: 'Nurse Emily',
      phoneNumber: '555-777-9999',
    },
  });

  const nurse2 = await prisma.nurse.create({
    data: {
      name: 'Nurse Tania',
      phoneNumber: '555-27-9551',
    },
  });

  // Create a HospitalBed
  const hospitalBed = await prisma.hospitalBed.create({
    data: {
      roomNo: '204B',
      floorNo: 2,
      hospitalId: hospital.id,
    },
  });

  const hospitalBed2 = await prisma.hospitalBed.create({
    data: {
      roomNo: '404A',
      floorNo: 4,
      hospitalId: hospital2.id,
    },
  });

  // Create an IcuMachine
  const icuMachine = await prisma.icuMachine.create({
    data: {
      ecg: 92,
      sp02: 94,
      rr: 20,
      bt: 39,
      nibt: 110,
      hr: 88,
      icuMachineId: 'eee4e813-e74d-40a8-95da-47dad2e1cb65',
      hospitalId: hospital.id,
      createdAt: new Date(),
    },
  });

  const icuMachine2 = await prisma.icuMachine.create({
    data: {
      ecg: 92,
      sp02: 94,
      rr: 20,
      bt: 39,
      nibt: 110,
      hr: 88,
      icuMachineId: 'fgh4e813-e74d-40a8-95da-47dad2e1cb75',
      hospitalId: hospital2.id,
      createdAt: new Date(),
    },
  });

  // Assign Machine to Bed 1
  await prisma.hospitalBed.update({
    where: {
      id: hospitalBed.id,
    },
    data: {
      icuMachineId: icuMachine.id,
    },
  });

  // Assign Machine to Bed 2
  await prisma.hospitalBed.update({
    where: {
      id: hospitalBed2.id,
    },
    data: {
      icuMachineId: icuMachine2.id,
    },
  });

  // Create a Patient
  const patient = await prisma.patient.create({
    data: {
      name: 'Bob Johnson',
      age: 45,
      gender: 'Male',
      email: 'bob.johnson@example.com',
      phoneNumber: '888-111-2222',
      healthStatus: 'Critical',
      doctorId: doctor.id,
      hospitalId: hospital.id,
      assignedBedId: hospitalBed.id,
      nurseId: nurse.id,
      assignedAt: new Date(),
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: 'Jack Durman',
      age: 22,
      gender: 'Male',
      email: 'jack.durman@example.com',
      phoneNumber: '8123-111-2222',
      healthStatus: 'Stable',
      doctorId: doctor2.id,
      hospitalId: hospital2.id,
      assignedBedId: hospitalBed2.id,
      nurseId: nurse2.id,
      assignedAt: new Date(),
    },
  });

  // Create a HealthReport
  await prisma.healthReport.create({
    data: {
      report: 'Condition is worsening, still under observation.',
      nurseId: nurse.id, // Direct assignment of nurseId
      patientId: patient.id,
      createdAt: new Date(),
    },
  });

  await prisma.healthReport.create({
    data: {
      report:
        'Patient showing signs of improvement, but still under observation.',
      nurseId: nurse2.id, // Direct assignment of nurseId
      patientId: patient2.id,
      createdAt: new Date(),
    },
  });

  console.log('New seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
