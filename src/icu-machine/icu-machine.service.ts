import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PatientICUMedicalHistory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  IcuMachinePayload,
  EnrichedIcuMachinePayload,
} from 'src/utils/type-definitions/MQTT.interface';

@Injectable()
export class IcuMachineService {
  private readonly logger = new Logger(IcuMachineService.name);

  constructor(
    @Inject('MQTT_SERVICE') private readonly mqttClient: ClientProxy,
    private prisma: PrismaService,
  ) {}

  async savePatientIcuHistory(payload: IcuMachinePayload): Promise<void> {
    // ? 1st Find Corresponding Registered machine
    const icuMacine = await this.prisma.icuMachine.findFirst({
      where: {
        icuMachineId: payload.idMesinIcu,
      },
      select: {
        id: true,
      },
    });

    // ? 1st Guard clause if machine not registered
    if (icuMacine === null) {
      this.logger.debug(
        `Machine with hardware id ${payload.idMesinIcu} is not registered, exhausting record.`,
      );
      return;
    }

    // ? 2nd Find Corresponding Assigned Bed
    const hospitalBed = await this.prisma.hospitalBed.findFirst({
      where: {
        icuMachineId: icuMacine.id,
      },
      select: {
        id: true,
        status: true,
        hospital: {
          select: {
            id: true,
            name: true,
            location: true,
            phoneNumber: true,
          },
        },
      },
    });

    // ? 2nd Guard clause if patient already checked out.
    if (hospitalBed.status === 'vacant') {
      this.logger.debug(`Bed status is vacant, exhausting record.`);
      return;
    }

    // ? 3rd find the patient
    const patient = await this.prisma.patient.findFirst({
      where: {
        assignedBedId: hospitalBed.id,
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

    // ? 3rd Guard Clause if Patient ALready Exited ICU
    if (patient.hasExited) {
      this.logger.debug(
        `Patient with id ${patient.id} already left the ICU, exhausting record.`,
      );
      return;
    }

    delete patient.createdAt;
    delete patient.updatedAt;

    const enrichedPayload: EnrichedIcuMachinePayload = {
      ecg: payload.ecg,
      sp02: payload.sp02,
      rr: payload.rr,
      bt: payload.bt,
      systolic: payload.systolic,
      diastolic: payload.diastolic,
      nipb: payload.nipb,
      hr: payload.hr,
    };

    // ? 4th Publish Enriched payload
    this.publishMessage(`IcuTopicEnriched/${patient.id}`, enrichedPayload);

    // !! TURN THIS ON IN PROD
    // try {
    //   await this.prisma.patientICUMedicalHistory.create({
    //     data: {
    //       ecg: payload.ecg,
    //       sp02: payload.sp02,
    //       rr: payload.rr,
    //       bt: payload.bt,
    //       systolic: payload.systolic,
    //       diastolic: payload.diastolic,
    //       nipb: payload.nipb,
    //       hr: payload.hr,
    //       hospitalId: hospitalBed.hospital.id,
    //       assignedBedId: hospitalBed.id,
    //       icuMachineId: icuMacine.id,
    //       doctorId: patient.doctorId,
    //       patientId: patient.id,
    //     },
    //   });
    // } catch (e) {
    //   console.log(e);
    // }

    // this.logger.debug(`Enriched record published for bed ${hospitalBed.id}`);

    return;
  }

  private publishMessage(topic: string, message: object) {
    this.mqttClient.emit(topic, message);
  }
}
