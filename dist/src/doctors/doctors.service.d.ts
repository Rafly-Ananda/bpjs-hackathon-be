import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Doctor, Patient } from '@prisma/client';
import { HospitalService } from 'src/hospital/hospital.service';
export declare class DoctorsService {
    private prisma;
    private hospitalService;
    constructor(prisma: PrismaService, hospitalService: HospitalService);
    getAssignedPatients(doctorId: string): Promise<Patient[] | []>;
    getPatientsHistory(doctorId: string): Promise<Patient[] | []>;
    getDoctor(doctorWhereUniqueInput: Prisma.DoctorWhereUniqueInput): Promise<Doctor | null>;
    getDoctors(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.DoctorWhereUniqueInput;
        where?: Prisma.DoctorWhereInput;
        orderBy?: Prisma.DoctorOrderByWithRelationInput;
    }): Promise<Doctor[]>;
}
