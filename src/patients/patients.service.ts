import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Patient,
  PatientICUMedicalHistory,
  HealthReport,
} from '@prisma/client';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async getPatientDetail(patientId: string): Promise<Patient | null> {
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
      orderBy: {
        createdAt: 'desc',
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

  async getPatientICUHistory(
    patientId: string,
  ): Promise<PatientICUMedicalHistory[] | []> {
    const patientICUHistory =
      await this.prisma.patientICUMedicalHistory.findMany({
        where: {
          patientId: patientId,
        },
      });

    return patientICUHistory;
  }

  async getPatients(doctorId: string): Promise<Patient[] | []> {
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

  async createHealthReport(
    patientId: string,
    nurseId: string,
    report: string,
  ): Promise<HealthReport> {
    return this.prisma.healthReport.create({
      data: {
        patientId: patientId,
        nurseId: nurseId,
        report: report,
      },
    });
  }

  async mockJKNResult(): Promise<Patient[] | []> {
    return this.prisma.patient.findMany({
      where: {
        hasExited: false,
      },
      take: 2,
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
