import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Doctor, Patient } from '@prisma/client';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private patientService: PatientsService,
  ) {}

  async assignedPatients(doctorId: string): Promise<Patient[] | []> {
    return this.patientService.patients(doctorId);
  }

  async user(
    userWhereUniqueInput: Prisma.DoctorWhereUniqueInput,
  ): Promise<Doctor | null> {
    return this.prisma.doctor.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DoctorWhereUniqueInput;
    where?: Prisma.DoctorWhereInput;
    orderBy?: Prisma.DoctorOrderByWithRelationInput;
  }): Promise<Doctor[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.doctor.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.DoctorCreateInput): Promise<Doctor> {
    return this.prisma.doctor.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.DoctorWhereUniqueInput;
    data: Prisma.DoctorUpdateInput;
  }): Promise<Doctor> {
    const { where, data } = params;
    return this.prisma.doctor.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.DoctorWhereUniqueInput): Promise<Doctor> {
    return this.prisma.doctor.delete({
      where,
    });
  }
}
