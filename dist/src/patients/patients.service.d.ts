import { PrismaService } from 'src/prisma/prisma.service';
import { Patient } from '@prisma/client';
export declare class PatientsService {
    private prisma;
    constructor(prisma: PrismaService);
    patient(patientId: string): Promise<Patient | null>;
    patients(doctorId: string): Promise<Patient[] | []>;
}
