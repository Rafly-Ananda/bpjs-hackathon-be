import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, MqttContext, Ctx } from '@nestjs/microservices';
import { IcuMachineService } from './icu-machine.service';
import { IcuMachinePayload } from 'src/utils/type-definitions/MQTT.interface';

@Controller('icu-machine')
export class IcuMachineController {
  constructor(private icuMachineService: IcuMachineService) {}

  private readonly logger = new Logger(IcuMachineController.name);

  // Listen to a specific MQTT topic
  @EventPattern('IcuTopic/#')
  async handleMqttMessage(
    @Payload() data: IcuMachinePayload,
    @Ctx() context: MqttContext,
  ) {
    const topic = context.getTopic();
    this.logger.log(`Received message on topic '${topic}'`);

    // assumption, semua mesin yang ada di publish di topic ini, udh kedaftar di db
    // this.icuMachineService.savePatientIcuHistory(data);

    // this.logger.log(`Patient record saved '${topic}'`);
  }
}
