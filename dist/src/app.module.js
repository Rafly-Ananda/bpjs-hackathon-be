"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const doctors_module_1 = require("./doctors/doctors.module");
const prisma_service_1 = require("./prisma/prisma.service");
const prisma_module_1 = require("./prisma/prisma.module");
const icu_machine_module_1 = require("./icu-machine/icu-machine.module");
const patients_controller_1 = require("./patients/patients.controller");
const patients_module_1 = require("./patients/patients.module");
const hospital_controller_1 = require("./hospital/hospital.controller");
const hospital_module_1 = require("./hospital/hospital.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule,
            doctors_module_1.DoctorsModule,
            prisma_module_1.PrismaModule,
            icu_machine_module_1.IcuMachineModule,
            patients_module_1.PatientsModule,
            hospital_module_1.HospitalModule,
        ],
        controllers: [app_controller_1.AppController, patients_controller_1.PatientsController, hospital_controller_1.HospitalController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map