import { Request, Response } from 'express';
import { VerificationService } from '../services/verification.service';

export class VerificationController {
    private verificationService: VerificationService;

    constructor(verificationService: VerificationService) {
        this.verificationService = verificationService;
    }

    public async verify(req: Request, res: Response) {
        const proof = req.body;

        try {
            const verifyRes = await this.verificationService.verifyProof(proof);

            if (verifyRes.success) {
                res.status(200).send(verifyRes);
            } else {
                res.status(400).send(verifyRes);
            }
        } catch (error) {
            res.status(500).send({ message: 'Internal Server Error', error });
        }
    }
}