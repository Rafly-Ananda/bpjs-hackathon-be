import { DoctorsService } from './doctors.service';
import { Patient, Doctor } from '@prisma/client';
export declare class DoctorsController {
    private doctorService;
    constructor(doctorService: DoctorsService);
    getDoctorProfile(req: any): Promise<Doctor>;
    getAssignedPatients(req: any): Promise<Patient[] | Patient>;
    getPatientsHistory(req: any): Promise<Patient[] | Patient>;
}
