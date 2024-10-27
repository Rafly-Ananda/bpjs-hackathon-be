import { Module } from '@nestjs/common';
import { IcuMachineService } from './icu-machine.service';
import { IcuMachineController } from './icu-machine.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // Bootstrap MQTT as Producer (Publisher)
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          host: process.env.MQTT_HOST,
          port: 8883,
          protocol: 'mqtts',
          username: process.env.MQTT_USER,
          password: process.env.MQTT_PASS,
        },
      },
    ]),
  ],
  providers: [IcuMachineService, PrismaService],
  controllers: [IcuMachineController],
})
export class IcuMachineModule {}
