import { DataSource, Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { Participation } from "../entities/participation.entity";

export class ProductService {
  private productRepository: Repository<Product>;
  private participationRepository: Repository<Participation>;

  constructor(dataSource: DataSource) {
    this.productRepository = dataSource.getRepository(Product);
    this.participationRepository = dataSource.getRepository(Participation);
  }

  async createProduct(productData: Product): Promise<Product> {
    return await this.productRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const { addressParticipations, ...productInfo } = productData;
        // Création de l'instance du produit
        let product = this.productRepository.create({
          ...productInfo,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "admin",
          updatedBy: "admin",
        });

        // Sauvegarde préliminaire pour obtenir un ID de produit
        product = await transactionalEntityManager.save(product);

        if (addressParticipations && addressParticipations.length > 0) {
          // Vérification pour l'unicité de faceNumber au sein de ce produit et si elle est conforme
          const faceNumbers = addressParticipations.map((p) => p.faceNumber);
          const uniqueFaceNumbers = new Set(faceNumbers);
          if (uniqueFaceNumbers.size !== addressParticipations.length) {
            throw new Error(
              "Chaque faceNumber doit être unique pour un produit donné."
            );
          }

          if (faceNumbers.some((fn) => fn > product.totalFace && fn < 0)) {
            throw new Error(
              "La faceNumber doit être inférieure ou égale au nombre de faces du produit et supérieure à 0."
            );
          }

          // Création et sauvegarde des participations après les vérifications
          for (let participationData of addressParticipations) {
            let participationInstance = this.participationRepository.create({
              ...participationData,
              product,
              createdAt: new Date(),
              updatedAt: new Date(),
              createdBy: "admin",
              updatedBy: "admin",
            });
            await transactionalEntityManager.save(participationInstance);
          }
        }
        return product;
      }
    );
  }

  async getProductStatusById(id: number): Promise<boolean | null> {
    const product = await this.productRepository.findOne({
      where: { id },
      select: ["status"],
    });
    if (!product) {
      return null;
    }
    return product.status;
  }

  async updateStatusById(id: number, status: boolean): Promise<boolean | null> {
    let product = await this.productRepository.findOne({
      where: { id },
    });

    console.log(product);

    if (!product) {
      return null;
    }
    product.status = status;
    product = {
      ...product,
      updatedAt: new Date(),
      updatedBy: "admin",
    };

    await this.productRepository.save(product);
    return product.status;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async createProducts(productsData: Product[]): Promise<Product[]> {
    return await this.productRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const productsWithParticipationsPromises = productsData.map(
          async (productData) => {
            const { addressParticipations, ...productInfo } = productData;
            // Créer une instance de Product
            let product = this.productRepository.create({
              ...productInfo,
              createdAt: new Date(),
              updatedAt: new Date(),
              createdBy: "admin",
              updatedBy: "admin",
            });

            // Sauvegarder l'instance de Product
            product = await transactionalEntityManager.save(product);

            if (addressParticipations && addressParticipations.length > 0) {
              // Préparation et vérification des participations
              const faceNumbers = new Set();
              const participationsInstances = addressParticipations.map(
                (participationData) => {
                  if (
                    faceNumbers.has(participationData.faceNumber) ||
                    participationData.faceNumber > product.totalFace ||
                    participationData.faceNumber < 0
                  ) {
                    throw new Error(
                      "Violation de l'unicité de faceNumber ou dépassement du nombre de faces du produit."
                    );
                  }
                  faceNumbers.add(participationData.faceNumber);

                  return this.participationRepository.create({
                    ...participationData,
                    product: product, // Lier la participation au produit
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    createdBy: "admin",
                    updatedBy: "admin",
                  });
                }
              );

              // Sauvegarde des instances de Participation
              for (const participation of participationsInstances) {
                await transactionalEntityManager.save(participation);
              }
            }

            return product;
          }
        );

        // Résolution de toutes les promesses de création de produits
        const productsWithParticipations = await Promise.all(
          productsWithParticipationsPromises
        );
        return productsWithParticipations;
      }
    );
  }

  async getProductById(id: number): Promise<Product | null> {
    return await this.productRepository.findOne({
      where: { id },
      relations: {
        addressParticipations: true,
      },
    });
  }

  async updateProductById(
    id: number,
    productUpdates: Partial<Product>
  ): Promise<Product | null> {
    let product = await this.productRepository.findOne({
      where: { id },
      relations: {
        addressParticipations: true,
      },
    });

    if (!product) {
      return null;
    }

    product = this.productRepository.merge(product, productUpdates);
    product.updatedAt = new Date();
    product.updatedBy = "admin";

    await this.productRepository.save(product);
    return product;
  }

  async deleteProductById(id: number): Promise<boolean> {
    let product = await this.productRepository.findOneBy({ id });
    if (!product) {
      return false;
    }
    await this.productRepository.remove(product);
    return true;
  }
}