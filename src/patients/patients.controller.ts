import { AuthGuard } from 'src/auth/auth.guard';
import { PatientsService } from './patients.service';
import { Get, Param, Controller, UseGuards } from '@nestjs/common';
import { Patient } from '@prisma/client';

@Controller('patients')
export class PatientsController {
  constructor(private patientService: PatientsService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param() params: { id: string }): Promise<Patient | null> {
    const { id } = params;
    return this.patientService.patient(id);
  }
}
