import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DoctorsService } from 'src/doctors/doctors.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private doctorsService: DoctorsService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(
    email: string,
    pass: string,
    fcmToken: string,
  ): Promise<{ access_token: string }> {
    const user = await this.doctorsService.getDoctor({ email });

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const registeredDevice = await this.prisma.registeredDevice.findFirst({
      where: {
        doctorId: user.id,
      },
    });

    if (!registeredDevice) {
      await this.prisma.registeredDevice.create({
        data: {
          fcm_token: fcmToken,
          doctorId: user.id,
        },
      });
    } else {
      await this.prisma.registeredDevice.update({
        where: {
          doctorId: user.id,
        },
        data: {
          fcm_token: fcmToken,
        },
      });
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
