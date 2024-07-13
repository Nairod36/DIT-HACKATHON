"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verificationRoutes;
const express_1 = require("express");
const verification_controller_1 = require("../controllers/verification.controller");
const verification_service_1 = require("../services/verification.service");
function verificationRoutes() {
    const router = (0, express_1.Router)();
    const verificationService = new verification_service_1.VerificationService();
    const verificationController = new verification_controller_1.VerificationController(verificationService);
    router.post('/verify', (req, res) => verificationController.verify(req, res));
    return router;
}
