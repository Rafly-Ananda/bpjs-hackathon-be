import { PrismaService } from 'src/prisma/prisma.service';
import { Patient, PatientICUMedicalHistory } from '@prisma/client';
export declare class PatientsService {
    private prisma;
    constructor(prisma: PrismaService);
    getPatientDetail(patientId: string): Promise<Patient | null>;
    getPatientICUHistory(patientId: string): Promise<PatientICUMedicalHistory[] | []>;
    getPatients(doctorId: string): Promise<Patient[] | []>;
}
