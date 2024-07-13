import { Router } from 'express';
import { VerificationController } from '../controllers/verification.controller';
import { VerificationService } from '../services/verification.service';

export default function verificationRoutes() {
    const router: Router = Router();
    const verificationService = new VerificationService();
    const verificationController = new VerificationController(verificationService);

    router.post('/verify', (req, res) => verificationController.verify(req, res));

    return router;
}