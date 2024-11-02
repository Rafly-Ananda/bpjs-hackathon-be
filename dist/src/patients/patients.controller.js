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
exports.PatientsController = void 0;
const auth_guard_1 = require("../auth/auth.guard");
const patients_service_1 = require("./patients.service");
const common_1 = require("@nestjs/common");
let PatientsController = class PatientsController {
    constructor(patientService) {
        this.patientService = patientService;
    }
    getPatientDetail(params) {
        const { id } = params;
        return this.patientService.getPatientDetail(id);
    }
    getPatientICUDetail(params) {
        const { id } = params;
        return this.patientService.getPatientICUHistory(id);
    }
    createHealthReport(params, healthReportDto) {
        const { id: patientId } = params;
        return this.patientService.createHealthReport(patientId, healthReportDto.nurseId, healthReportDto.report);
    }
    mockJKNResult() {
        return this.patientService.mockJKNResult();
    }
};
exports.PatientsController = PatientsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "getPatientDetail", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id/icu-history'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "getPatientICUDetail", null);
__decorate([
    (0, common_1.Post)(':id/health-report'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "createHealthReport", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('jkn/mock'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "mockJKNResult", null);
exports.PatientsController = PatientsController = __decorate([
    (0, common_1.Controller)('patients'),
    __metadata("design:paramtypes", [patients_service_1.PatientsService])
], PatientsController);
//# sourceMappingURL=patients.controller.js.map