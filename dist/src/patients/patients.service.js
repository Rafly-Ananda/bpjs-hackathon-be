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
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PatientsService = class PatientsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPatientDetail(patientId) {
        const patient = await this.prisma.patient.findFirst({
            where: {
                id: patientId,
            },
            include: {
                nurse: {
                    select: {
                        name: true,
                        phoneNumber: true,
                    },
                },
                hospital: {
                    select: {
                        name: true,
                        location: true,
                    },
                },
                assignedBed: {
                    select: {
                        roomNo: true,
                        floorNo: true,
                        status: true,
                        icuMachineId: true,
                    },
                },
            },
        });
        const healthReport = await this.prisma.healthReport.findMany({
            where: {
                patientId: patient.id,
            },
            select: {
                report: true,
                submittedBy: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        const icuMachineHardwareId = await this.prisma.icuMachine.findFirst({
            where: {
                id: patient.assignedBed.icuMachineId,
            },
            select: {
                icuMachineId: true,
            },
        });
        delete patient.createdAt;
        delete patient.updatedAt;
        const payload = {
            ...patient,
            ...icuMachineHardwareId,
            healthReports: [...healthReport],
        };
        return payload;
    }
    async getPatientICUHistory(patientId) {
        const patientICUHistory = await this.prisma.patientICUMedicalHistory.findMany({
            where: {
                patientId: patientId,
            },
        });
        return patientICUHistory;
    }
    async getPatients(doctorId) {
        const patients = await this.prisma.patient.findMany({
            where: {
                doctorId: doctorId,
            },
            include: {
                nurse: {
                    select: {
                        name: true,
                        phoneNumber: true,
                    },
                },
                hospital: {
                    select: {
                        name: true,
                        location: true,
                    },
                },
                assignedBed: {
                    select: {
                        roomNo: true,
                        floorNo: true,
                        status: true,
                        icuMachineId: true,
                    },
                },
            },
        });
        const sanitized = patients.map((e) => {
            delete e.createdAt;
            delete e.updatedAt;
            return e;
        });
        return sanitized;
    }
    async createHealthReport(patientId, nurseId, report) {
        return this.prisma.healthReport.create({
            data: {
                patientId: patientId,
                nurseId: nurseId,
                report: report,
            },
        });
    }
    async mockJKNResult() {
        return this.prisma.patient.findMany({
            where: {
                hasExited: false,
            },
            take: 2,
            orderBy: {
                createdAt: 'asc',
            },
        });
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map