import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Patient } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('patients')
  getAssignedPatients(@Request() req): Promise<Patient[] | Patient> {
    const { sub: doctorId } = req.user;
    return this.userService.assignedPatients(doctorId);
  }
}
