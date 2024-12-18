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
var IcuMachineController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcuMachineController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const icu_machine_service_1 = require("./icu-machine.service");
let IcuMachineController = IcuMachineController_1 = class IcuMachineController {
    constructor(icuMachineService) {
        this.icuMachineService = icuMachineService;
        this.logger = new common_1.Logger(IcuMachineController_1.name);
    }
    async handleMqttMessage(data, context) {
        const topic = context.getTopic();
        this.icuMachineService.savePatientIcuHistory(data);
    }
};
exports.IcuMachineController = IcuMachineController;
__decorate([
    (0, microservices_1.EventPattern)('IcuTopic/#'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.MqttContext]),
    __metadata("design:returntype", Promise)
], IcuMachineController.prototype, "handleMqttMessage", null);
exports.IcuMachineController = IcuMachineController = IcuMachineController_1 = __decorate([
    (0, common_1.Controller)('icu-machine'),
    __metadata("design:paramtypes", [icu_machine_service_1.IcuMachineService])
], IcuMachineController);
//# sourceMappingURL=icu-machine.controller.js.map