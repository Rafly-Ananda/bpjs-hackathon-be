import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HospitalController } from './hospital.controller';

@Module({
  providers: [PrismaService, HospitalService],
  exports: [HospitalService],
  controllers: [HospitalController],
})
export class HospitalModule {}
