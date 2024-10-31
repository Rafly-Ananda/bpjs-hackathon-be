import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Hospital } from '@prisma/client';

@Injectable()
export class HospitalService {
  constructor(private prisma: PrismaService) {}

  async getPatientsByHospital(doctorId: string): Promise<any> {
    const response = await this.prisma.hospital.findMany({
      where: {
        doctorIds: {
          has: doctorId,
        },
      },
      select: {
        name: true,
        patients: {
          where: {
            hasExited: false,
            doctorId: doctorId,
          },
          select: {
            id: true,
            name: true,
            healthStatus: true,
          },
        },
      },
    });

    return response;
  }

  async getPatientsHistoryByHospital(doctorId: string): Promise<any> {
    const response = await this.prisma.hospital.findMany({
      where: {
        doctorIds: {
          has: doctorId,
        },
      },
      select: {
        name: true,
        patients: {
          where: {
            hasExited: true,
            doctorId: doctorId,
          },
          select: {
            id: true,
            name: true,
            healthStatus: true,
          },
        },
      },
    });

    return response;
  }
}
