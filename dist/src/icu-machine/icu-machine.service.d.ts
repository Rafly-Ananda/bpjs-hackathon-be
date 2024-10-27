import { ClientProxy } from '@nestjs/microservices';
import { PatientICUMedicalHistory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IcuMachinePayload } from 'src/utils/type-definitions/MQTT.interface';
export declare class IcuMachineService {
    private readonly mqttClient;
    private prisma;
    private readonly logger;
    constructor(mqttClient: ClientProxy, prisma: PrismaService);
    savePatientIcuHistory(payload: IcuMachinePayload): Promise<PatientICUMedicalHistory | void>;
    private publishMessage;
}
