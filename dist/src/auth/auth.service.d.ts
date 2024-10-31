import { DoctorsService } from 'src/doctors/doctors.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private doctorsService;
    private jwtService;
    constructor(doctorsService: DoctorsService, jwtService: JwtService);
    signIn(email: string, pass: string): Promise<{
        access_token: string;
    }>;
}
