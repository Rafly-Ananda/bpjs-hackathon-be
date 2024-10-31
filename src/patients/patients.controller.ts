import { AuthGuard } from 'src/auth/auth.guard';
import { PatientsService } from './patients.service';
import { Get, Param, Controller, UseGuards } from '@nestjs/common';
import { Patient, PatientICUMedicalHistory } from '@prisma/client';

@Controller('patients')
export class PatientsController {
  constructor(private patientService: PatientsService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  getPatientDetail(@Param() params: { id: string }): Promise<Patient | null> {
    const { id } = params;
    return this.patientService.getPatientDetail(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id/icu-history')
  getPatientICUDetail(
    @Param() params: { id: string },
  ): Promise<PatientICUMedicalHistory[] | []> {
    const { id } = params;
    return this.patientService.getPatientICUHistory(id);
  }
}
