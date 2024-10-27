import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Patient } from '@prisma/client';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async patient(patientId: string): Promise<Patient | null> {
    const patient = await this.prisma.patient.findFirst({
      where: {
        id: patientId,
      },
      include: {
        nurse: {
          select: {
            name: true,
            phoneNumber: true,
          },
        },
        hospital: {
          select: {
            name: true,
            location: true,
          },
        },
        assignedBed: {
          select: {
            roomNo: true,
            floorNo: true,
            status: true,
            icuMachineId: true,
          },
        },
      },
    });

    const healthReport = await this.prisma.healthReport.findMany({
      where: {
        patientId: patient.id,
      },
      select: {
        report: true,
        submittedBy: true,
      },
    });

    const icuMachineHardwareId = await this.prisma.icuMachine.findFirst({
      where: {
        id: patient.assignedBed.icuMachineId,
      },
      select: {
        icuMachineId: true,
      },
    });

    delete patient.createdAt;
    delete patient.updatedAt;

    const payload = {
      ...patient,
      ...icuMachineHardwareId,
      healthReports: [...healthReport],
    };

    return payload;
  }

  async patients(doctorId: string): Promise<Patient[] | []> {
    const patients = await this.prisma.patient.findMany({
      where: {
        doctorId: doctorId,
      },
      include: {
        nurse: {
          select: {
            name: true,
            phoneNumber: true,
          },
        },
        hospital: {
          select: {
            name: true,
            location: true,
          },
        },
        assignedBed: {
          select: {
            roomNo: true,
            floorNo: true,
            status: true,
            icuMachineId: true,
          },
        },
      },
    });

    const sanitized = patients.map((e) => {
      delete e.createdAt;
      delete e.updatedAt;

      return e;
    });

    return sanitized;
  }
}
