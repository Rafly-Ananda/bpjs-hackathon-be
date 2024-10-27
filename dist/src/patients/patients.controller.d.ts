import { PatientsService } from './patients.service';
import { Patient } from '@prisma/client';
export declare class PatientsController {
    private patientService;
    constructor(patientService: PatientsService);
    findOne(params: {
        id: string;
    }): Promise<Patient | null>;
}
