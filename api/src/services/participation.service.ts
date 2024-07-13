import { DataSource, Repository } from "typeorm";
import { Participation } from "../entities/participation.entity";
import { Product } from "../entities/product.entity"; 

export class ParticipationService {
    private participationRepository: Repository<Participation>;
    private productRepository: Repository<Product>; 

    constructor(dataSource: DataSource) {
        this.participationRepository = dataSource.getRepository(Participation);
        this.productRepository = dataSource.getRepository(Product);
    }

    async createParticipation(participationData: Participation): Promise<Participation | null> {
        const productExists = await this.productRepository.findOneBy({ id: participationData.product.id });
        if (!productExists) {
            console.error("Le produit associé n'existe pas.");
            return null; 
        }

        // Vérifier qu'on créer une participation pour une face qui n'a pas déjà été attribuée
        const participationExists = await this.participationRepository.findOneBy({ faceNumber: participationData.faceNumber });
        if (participationExists) {
            console.error("La face a déjà été attribuée.");
            return null; 
        }

        // Vérifier que la face number est inférieur ou égal au nombre de faces du produit
        if (participationData.faceNumber > productExists.totalFace) {
            console.error("La face number doit être inférieure ou égale au nombre de faces du produit.");
            return null; 
        }
        
        return await this.participationRepository.save(participationData);
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