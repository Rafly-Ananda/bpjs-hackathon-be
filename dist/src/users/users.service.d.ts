import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Doctor, Patient } from '@prisma/client';
import { PatientsService } from 'src/patients/patients.service';
export declare class UsersService {
    private prisma;
    private patientService;
    constructor(prisma: PrismaService, patientService: PatientsService);
    assignedPatients(doctorId: string): Promise<Patient[] | []>;
    user(userWhereUniqueInput: Prisma.DoctorWhereUniqueInput): Promise<Doctor | null>;
    users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.DoctorWhereUniqueInput;
        where?: Prisma.DoctorWhereInput;
        orderBy?: Prisma.DoctorOrderByWithRelationInput;
    }): Promise<Doctor[]>;
    createUser(data: Prisma.DoctorCreateInput): Promise<Doctor>;
    updateUser(params: {
        where: Prisma.DoctorWhereUniqueInput;
        data: Prisma.DoctorUpdateInput;
    }): Promise<Doctor>;
    deleteUser(where: Prisma.DoctorWhereUniqueInput): Promise<Doctor>;
}
