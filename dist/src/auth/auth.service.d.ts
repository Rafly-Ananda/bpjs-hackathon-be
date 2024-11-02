import { DoctorsService } from 'src/doctors/doctors.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private doctorsService;
    private jwtService;
    private prisma;
    constructor(doctorsService: DoctorsService, jwtService: JwtService, prisma: PrismaService);
    signIn(email: string, pass: string, fcmToken: string): Promise<{
        access_token: string;
    }>;
}
