import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Patient, Doctor } from '@prisma/client';

@Controller('doctors')
export class DoctorsController {
  constructor(private doctorService: DoctorsService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getDoctorProfile(@Request() req): Promise<Doctor> {
    const { email } = req.user;
    return this.doctorService.getDoctor({ email });
  }

  @UseGuards(AuthGuard)
  @Get('patients-lists')
  getAssignedPatients(@Request() req): Promise<Patient[] | Patient> {
    const { sub: doctorId } = req.user;
    return this.doctorService.getAssignedPatients(doctorId);
  }

  @UseGuards(AuthGuard)
  @Get('patients-histories')
  getPatientsHistory(@Request() req): Promise<Patient[] | Patient> {
    const { sub: doctorId } = req.user;
    return this.doctorService.getPatientsHistory(doctorId);
  }
}
