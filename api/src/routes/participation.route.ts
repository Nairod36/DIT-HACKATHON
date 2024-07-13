import { Router } from 'express';
import { DataSource } from 'typeorm';
import { ParticipationController } from '../controllers/participation.controller';
import { ParticipationService } from '../services/participation.service';

export default function participationRoutes(dataSource: DataSource) {
    const router: Router = Router();
    const productService = new ParticipationService(dataSource);
    const participationController = new ParticipationController(productService);

    router.post('/participations', (req, res) => participationController.createParticipation(req, res));
    router.get('/participations', (req, res) => participationController.getAllParticipations(req, res));
    router.get('/participations/:id', (req, res) => participationController.getParticipationById(req, res));
    router.delete('/participations/:id', (req, res) => participationController.deleteParticipationById(req, res));

    return router;
}