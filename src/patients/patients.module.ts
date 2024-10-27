import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatientsController } from './patients.controller';

@Module({
  providers: [PatientsService, PrismaService],
  exports: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
