import { UsersService } from './users.service';
import { Patient } from '@prisma/client';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getAssignedPatients(req: any): Promise<Patient[] | Patient>;
}
