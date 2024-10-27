import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { IcuMachineModule } from './icu-machine/icu-machine.module';
import { PatientsController } from './patients/patients.controller';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    // ENV
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    PrismaModule,
    IcuMachineModule,
    PatientsModule,
  ],
  controllers: [AppController, PatientsController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
