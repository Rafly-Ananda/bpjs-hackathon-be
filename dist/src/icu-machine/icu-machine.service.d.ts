import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';
import { IcuMachinePayload } from 'src/utils/type-definitions/MQTT.interface';
export declare class IcuMachineService {
    private readonly mqttClient;
    private prisma;
    private readonly logger;
    constructor(mqttClient: ClientProxy, prisma: PrismaService);
    savePatientIcuHistory(payload: IcuMachinePayload): Promise<void>;
    private publishMessage;
}
