import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DoctorsModule } from '../doctors/doctors.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    // ENV
    ConfigModule.forRoot({ isGlobal: true }),
    DoctorsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRY },
    }),
  ],
  // ? below option is added if we want all path inside of a module to be guarded
  providers: [
    AuthService,
    { provide: 'APP_GUARD', useClass: AuthGuard },
    PrismaService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
