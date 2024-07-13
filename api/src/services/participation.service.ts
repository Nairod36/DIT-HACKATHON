import { DataSource, Repository } from "typeorm";
import { Participation } from "../entities/participation.entity";

export class ParticipationService {
    private participationRepository: Repository<Participation>;

    constructor(dataSource: DataSource) {
        this.participationRepository = dataSource.getRepository(Participation);
    }

    async createParticipation(participationData: Participation): Promise<Participation | null> {
        // participation with product later
        return null;
    }

    async getAllParticipations(): Promise<Participation[]> {
        return await this.participationRepository.find();
    }

    async getParticipationById(id: number): Promise<Participation | null> {
        return await this.participationRepository.findOneBy({ id });
    }

    async deleteParticipationById(id: number): Promise<Participation | null> {
        const participation = await this.participationRepository.findOneBy({ id });
        if (participation) {
            await this.participationRepository.remove(participation);
            return participation;
        }
        return null;
    }
}
