import { PatientsService } from './patients.service';
import { Patient, PatientICUMedicalHistory } from '@prisma/client';
export declare class PatientsController {
    private patientService;
    constructor(patientService: PatientsService);
    getPatientDetail(params: {
        id: string;
    }): Promise<Patient | null>;
    getPatientICUDetail(params: {
        id: string;
    }): Promise<PatientICUMedicalHistory[] | []>;
    createHealthReport(params: {
        id: string;
    }, healthReportDto: Record<string, any>): Promise<{
        id: string;
        nurseId: string;
        report: string;
        patientId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
