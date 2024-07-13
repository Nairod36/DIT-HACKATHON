import { Request, Response } from "express";
import { ParticipationService } from "../services/participation.service";

export class ParticipationController {
  private participationService: ParticipationService;

  constructor(participationService: ParticipationService) {
    this.participationService = participationService;
  }

  public async createParticipation(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const participation = await this.participationService.createParticipation(
        req.body
      );
      return res.status(201).json(participation);
    } catch (error) {
      return res
        .status(400)
        .json({
          message: "Could not create participation",
          error: String(error),
        });
    }
  }

  public async getAllParticipations(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const participations = await this.participationService.getAllParticipations();
      return res.status(200).json(participations);
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Could not retrieve participations",
          error: String(error),
        });
    }
  }

  public async deleteParticipationById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const participation = await this.participationService.deleteParticipationById(
        parseInt(req.params.id)
      );
      if (!participation) {
        return res.status(404).json({ message: "Participation not found" });
      }
      return res
        .status(200)
        .json({ message: "Participation deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Could not delete participation",
          error: String(error),
        });
    }
  }

  public async getParticipationById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const participation = await this.participationService.getParticipationById(
        parseInt(req.params.id)
      );
      if (!participation) {
        return res.status(404).json({ message: "Participation not found" });
      }
      return res.status(200).json(participation);
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Could not retrieve participation",
          error: String(error),
        });
    }
  }
}