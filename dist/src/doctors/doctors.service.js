"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const hospital_service_1 = require("../hospital/hospital.service");
let DoctorsService = class DoctorsService {
    constructor(prisma, hospitalService) {
        this.prisma = prisma;
        this.hospitalService = hospitalService;
    }
    async getAssignedPatients(doctorId) {
        return this.hospitalService.getPatientsByHospital(doctorId);
    }
    async getPatientsHistory(doctorId) {
        return this.hospitalService.getPatientsHistoryByHospital(doctorId);
    }
    async getDoctor(doctorWhereUniqueInput) {
        return this.prisma.doctor.findUnique({
            where: doctorWhereUniqueInput,
        });
    }
    async getDoctors(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.doctor.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        hospital_service_1.HospitalService])
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map