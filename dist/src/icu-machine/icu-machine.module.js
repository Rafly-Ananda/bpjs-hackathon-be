"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcuMachineModule = void 0;
const common_1 = require("@nestjs/common");
const icu_machine_service_1 = require("./icu-machine.service");
const icu_machine_controller_1 = require("./icu-machine.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const microservices_1 = require("@nestjs/microservices");
let IcuMachineModule = class IcuMachineModule {
};
exports.IcuMachineModule = IcuMachineModule;
exports.IcuMachineModule = IcuMachineModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'MQTT_SERVICE',
                    transport: microservices_1.Transport.MQTT,
                    options: {
                        host: process.env.MQTT_HOST,
                        port: 8883,
                        protocol: 'mqtts',
                        username: process.env.MQTT_USER,
                        password: process.env.MQTT_PASS,
                    },
                },
            ]),
        ],
        providers: [icu_machine_service_1.IcuMachineService, prisma_service_1.PrismaService],
        controllers: [icu_machine_controller_1.IcuMachineController],
    })
], IcuMachineModule);
//# sourceMappingURL=icu-machine.module.js.map