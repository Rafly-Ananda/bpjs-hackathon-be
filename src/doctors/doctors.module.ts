import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoctorsController } from './doctors.controller';
import { PatientsModule } from 'src/patients/patients.module';
import { HospitalModule } from 'src/hospital/hospital.module';
@Module({
  imports: [PatientsModule, HospitalModule],
  providers: [DoctorsService, PrismaService],
  exports: [DoctorsService],
  controllers: [DoctorsController],
})
export class DoctorsModule {}
