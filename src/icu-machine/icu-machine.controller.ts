import { Controller, Get, Logger, Post, Body } from '@nestjs/common';
import { EventPattern, Payload, MqttContext, Ctx } from '@nestjs/microservices';
import { IcuMachineService } from './icu-machine.service';
import { IcuMachine } from '@prisma/client';

@Controller('icu-machine')
export class IcuMachineController {
  constructor(private icuMachineService: IcuMachineService) {}

  private readonly logger = new Logger(IcuMachineController.name);

  // Listen to a specific MQTT topic
  @EventPattern('#')
  handleMqttMessage(@Payload() data: IcuMachine, @Ctx() context: MqttContext) {
    const topic = context.getTopic();
    this.logger.log(`Received message on topic '${topic}'`);

    // {
    //     ecg: 83,
    //     sp02: 84,
    //     rr: 11,
    //     bt: 43,
    //     nibt: 91,
    //     hr: 98,
    //     idMesinIcu: 'eee4e813-e74d-40a8-95da-47dad2e1cb65'
    //   }

    console.log(data);

    // return this.icuMachineService.insertMachineData(data);
  }
}
