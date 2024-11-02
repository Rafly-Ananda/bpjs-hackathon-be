"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
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
    const doctor = await prisma.doctor.create({
        data: {
            username: 'dr.marysmith',
            password: 'securepassword',
            name: 'Dr. Mary Smith',
            specialization: 'Neurology',
            email: 'mary.smith@example.com',
            phoneNumber: '222-444-6666',
            hospitalIds: [hospital.id, hospital2.id],
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
            hospitalIds: [hospital2.id],
        },
    });
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
    const nurse3 = await prisma.nurse.create({
        data: {
            name: 'Nurse Eric',
            phoneNumber: '981-11-9123',
        },
    });
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
    const hospitalBed3 = await prisma.hospitalBed.create({
        data: {
            roomNo: '211C',
            floorNo: 2,
            hospitalId: hospital2.id,
        },
    });
    const hospitalBed4 = await prisma.hospitalBed.create({
        data: {
            roomNo: '231A',
            floorNo: 2,
            hospitalId: hospital2.id,
        },
    });
    const icuMachine = await prisma.icuMachine.create({
        data: {
            icuMachineId: 'eee4e813-e74d-40a8-95da-47dad2e1cb65',
            hospitalId: hospital.id,
            createdAt: new Date(),
        },
    });
    const icuMachine2 = await prisma.icuMachine.create({
        data: {
            icuMachineId: 'a23c4fba-8fd6-4376-9068-06a9d48a2158',
            hospitalId: hospital2.id,
            createdAt: new Date(),
        },
    });
    const icuMachine3 = await prisma.icuMachine.create({
        data: {
            icuMachineId: 'f62efbdb-ceb4-419a-abca-1f2a6eb3dc56',
            hospitalId: hospital2.id,
            createdAt: new Date(),
        },
    });
    const icuMachine4 = await prisma.icuMachine.create({
        data: {
            icuMachineId: 'ddb432a5-1d20-4561-99c8-a96abd75d05f',
            hospitalId: hospital2.id,
            createdAt: new Date(),
        },
    });
    await prisma.hospitalBed.update({
        where: {
            id: hospitalBed.id,
        },
        data: {
            status: 'occupied',
            icuMachineId: icuMachine.id,
        },
    });
    await prisma.hospitalBed.update({
        where: {
            id: hospitalBed2.id,
        },
        data: {
            status: 'occupied',
            icuMachineId: icuMachine2.id,
        },
    });
    await prisma.hospitalBed.update({
        where: {
            id: hospitalBed3.id,
        },
        data: {
            status: 'occupied',
            icuMachineId: icuMachine3.id,
        },
    });
    await prisma.hospitalBed.update({
        where: {
            id: hospitalBed4.id,
        },
        data: {
            status: 'occupied',
            icuMachineId: icuMachine4.id,
        },
    });
    await prisma.hospital.update({
        where: {
            id: hospital.id,
        },
        data: {
            doctorIds: [doctor.id],
        },
    });
    await prisma.hospital.update({
        where: {
            id: hospital2.id,
        },
        data: {
            doctorIds: [doctor.id, doctor2.id],
        },
    });
    const patient = await prisma.patient.create({
        data: {
            name: 'Bob Johnson',
            age: 45,
            gender: 'Male',
            email: 'bob.johnson@example.com',
            phoneNumber: '888-111-2222',
            healthStatus: 'Critical',
            hasExited: false,
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
            hasExited: false,
            doctorId: doctor2.id,
            hospitalId: hospital2.id,
            assignedBedId: hospitalBed2.id,
            nurseId: nurse2.id,
            assignedAt: new Date(),
        },
    });
    const patient3 = await prisma.patient.create({
        data: {
            name: 'Dhana Renomi',
            age: 25,
            gender: 'Male',
            email: 'dahana.renomi@example.com',
            phoneNumber: '8123-111-2222',
            healthStatus: 'Critical',
            hasExited: false,
            doctorId: doctor.id,
            hospitalId: hospital2.id,
            assignedBedId: hospitalBed3.id,
            nurseId: nurse2.id,
            assignedAt: new Date(),
        },
    });
    const patient4 = await prisma.patient.create({
        data: {
            name: 'Kurniawan Gigih',
            age: 69,
            gender: 'Male',
            email: 'gigih.kurniawan@example.com',
            phoneNumber: '321-444-1233',
            healthStatus: 'Stable',
            hasExited: false,
            doctorId: doctor.id,
            hospitalId: hospital2.id,
            assignedBedId: hospitalBed4.id,
            nurseId: nurse3.id,
            assignedAt: new Date(),
        },
    });
    await prisma.healthReport.create({
        data: {
            report: 'Condition is worsening, still under observation.',
            nurseId: nurse.id,
            patientId: patient.id,
            createdAt: new Date(),
        },
    });
    await prisma.healthReport.create({
        data: {
            report: 'Patient showing signs of improvement, but still under observation.',
            nurseId: nurse2.id,
            patientId: patient2.id,
            createdAt: new Date(),
        },
    });
    await prisma.healthReport.create({
        data: {
            report: 'Patient probably will enter critical condition any minute now.',
            nurseId: nurse2.id,
            patientId: patient3.id,
            createdAt: new Date(),
        },
    });
    await prisma.healthReport.create({
        data: {
            report: 'Heartbeat is normalizing, conducting furhter analysis.',
            nurseId: nurse3.id,
            patientId: patient4.id,
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
//# sourceMappingURL=seed.js.map