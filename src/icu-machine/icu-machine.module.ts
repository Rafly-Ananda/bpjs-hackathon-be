import { Module } from '@nestjs/common';
import { IcuMachineService } from './icu-machine.service';
import { IcuMachineController } from './icu-machine.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [IcuMachineService, PrismaService],
  controllers: [IcuMachineController],
})
export class IcuMachineModule {}
