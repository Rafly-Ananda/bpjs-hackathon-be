import { MqttContext } from '@nestjs/microservices';
import { IcuMachineService } from './icu-machine.service';
import { IcuMachinePayload } from 'src/utils/type-definitions/MQTT.interface';
export declare class IcuMachineController {
    private icuMachineService;
    constructor(icuMachineService: IcuMachineService);
    private readonly logger;
    handleMqttMessage(data: IcuMachinePayload, context: MqttContext): Promise<void>;
}
