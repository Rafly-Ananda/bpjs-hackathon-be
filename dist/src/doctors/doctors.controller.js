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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsController = void 0;
const common_1 = require("@nestjs/common");
const doctors_service_1 = require("./doctors.service");
const auth_guard_1 = require("../auth/auth.guard");
let DoctorsController = class DoctorsController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    getDoctorProfile(req) {
        const { email } = req.user;
        return this.doctorService.getDoctor({ email });
    }
    getAssignedPatients(req) {
        const { sub: doctorId } = req.user;
        return this.doctorService.getAssignedPatients(doctorId);
    }
    getPatientsHistory(req) {
        const { sub: doctorId } = req.user;
        return this.doctorService.getPatientsHistory(doctorId);
    }
};
exports.DoctorsController = DoctorsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DoctorsController.prototype, "getDoctorProfile", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('patients-lists'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DoctorsController.prototype, "getAssignedPatients", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('patients-histories'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DoctorsController.prototype, "getPatientsHistory", null);
exports.DoctorsController = DoctorsController = __decorate([
    (0, common_1.Controller)('doctors'),
    __metadata("design:paramtypes", [doctors_service_1.DoctorsService])
], DoctorsController);
//# sourceMappingURL=doctors.controller.js.map