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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var IcuMachineService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcuMachineService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const prisma_service_1 = require("../prisma/prisma.service");
let IcuMachineService = IcuMachineService_1 = class IcuMachineService {
    constructor(mqttClient, prisma) {
        this.mqttClient = mqttClient;
        this.prisma = prisma;
        this.logger = new common_1.Logger(IcuMachineService_1.name);
    }
    async savePatientIcuHistory(payload) {
        const icuMacine = await this.prisma.icuMachine.findFirst({
            where: {
                icuMachineId: payload.idMesinIcu,
            },
            select: {
                id: true,
            },
        });
        if (icuMacine === null) {
            this.logger.error(`Machine with hardware id ${payload.idMesinIcu} is not registered, exhausting record.`);
            return;
        }
        const hospitalBed = await this.prisma.hospitalBed.findFirst({
            where: {
                icuMachineId: icuMacine.id,
            },
            select: {
                id: true,
                status: true,
                hospital: {
                    select: {
                        id: true,
                        name: true,
                        location: true,
                        phoneNumber: true,
                    },
                },
            },
        });
        if (hospitalBed.status === 'vacant') {
            this.logger.debug(`Bed status is vacantt, exhausting record.`);
            return;
        }
        const patient = await this.prisma.patient.findFirst({
            where: {
                assignedBedId: hospitalBed.id,
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
        if (patient.exitedAt !== null) {
            this.logger.error(`Patient with id ${patient.id} already left the ICU, exhausting record.`);
            return;
        }
        delete patient.createdAt;
        delete patient.updatedAt;
        const enrichedPayload = {
            ecg: payload.ecg,
            sp02: payload.sp02,
            rr: payload.rr,
            bt: payload.bt,
            nibt: payload.nibt,
            hr: payload.hr,
            ...patient,
        };
        this.publishMessage(`IcuTopicEnriched/${patient.id}`, enrichedPayload);
        this.logger.debug(`Enriched record published for bed ${hospitalBed.id}`);
        return;
    }
    publishMessage(topic, message) {
        this.mqttClient.emit(topic, message);
    }
};
exports.IcuMachineService = IcuMachineService;
exports.IcuMachineService = IcuMachineService = IcuMachineService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MQTT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        prisma_service_1.PrismaService])
], IcuMachineService);
//# sourceMappingURL=icu-machine.service.js.map