import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Doctor, Patient } from '@prisma/client';
import { HospitalService } from 'src/hospital/hospital.service';

@Injectable()
export class DoctorsService {
  constructor(
    private prisma: PrismaService,
    private hospitalService: HospitalService,
  ) {}

  async getAssignedPatients(doctorId: string): Promise<Patient[] | []> {
    return this.hospitalService.getPatientsByHospital(doctorId);
  }

  async getPatientsHistory(doctorId: string): Promise<Patient[] | []> {
    return this.hospitalService.getPatientsHistoryByHospital(doctorId);
  }

  async getDoctor(
    doctorWhereUniqueInput: Prisma.DoctorWhereUniqueInput,
  ): Promise<Doctor | null> {
    return this.prisma.doctor.findUnique({
      where: doctorWhereUniqueInput,
    });
  }

  async getDoctors(params: {
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
}
