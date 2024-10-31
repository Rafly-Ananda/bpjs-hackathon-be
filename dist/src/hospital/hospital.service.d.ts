import { PrismaService } from 'src/prisma/prisma.service';
export declare class HospitalService {
    private prisma;
    constructor(prisma: PrismaService);
    getPatientsByHospital(doctorId: string): Promise<any>;
    getPatientsHistoryByHospital(doctorId: string): Promise<any>;
}
