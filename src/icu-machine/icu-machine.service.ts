import { Injectable } from '@nestjs/common';
import { Prisma, IcuMachine } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IcuMachineService {
  constructor(private prisma: PrismaService) {}

  async insertMachineData(
    data: Prisma.IcuMachineCreateInput,
  ): Promise<IcuMachine> {
    return this.prisma.icuMachine.create({
      data,
    });
  }
}
