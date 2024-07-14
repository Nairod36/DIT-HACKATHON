import { Request, Response } from "express";
import { ProductService } from "../services/product.service"; 

export class ProductController {
  private productService: ProductService;

  // Le constructeur attend une instance de ProductService
  constructor(productService: ProductService) {
    this.productService = productService;
  }

  public async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product = await this.productService.createProduct(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Could not create product", error: String(error) });
    }
  }

  public async updateStatusById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const status = await this.productService.updateStatusById(
        parseInt(req.params.id),
        req.body.status
      );
      if (status === null) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ status });
    } catch (error) {
      return res.status(500).json({
        message: "Could not update product status",
        error: String(error),
      });
    }
  }

  public async getProductByIdWithToken(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      // Récupération du produit par ID
      const product = await this.productService.getProductById(
        parseInt(req.params.id)
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (req.params.token === process.env.TOKEN_BADGE) {
        return res.status(200).json(product);
      } else {
        return res.status(403).json({ message: "Access denied" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not retrieve product", error: String(error) });
    }
  }

  public async createProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productService.createProducts(req.body);
      return res.status(201).json(products);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Could not create products", error: String(error) });
    }
  }

  public async getStatusById(req: Request, res: Response): Promise<Response> {
    try {
      const status = await this.productService.getProductStatusById(
        parseInt(req.params.id)
      );
      if (status === null) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ status });
    } catch (error) {
      return res.status(500).json({
        message: "Could not retrieve product status",
        error: String(error),
      });
    }
  }

  public async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not retrieve products", error: String(error) });
    }
  }

  public async deleteProductById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const product = await this.productService.deleteProductById(
        parseInt(req.params.id)
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not delete product", error: String(error) });
    }
  }

  public async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const product = await this.productService.getProductById(
        parseInt(req.params.id)
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not retrieve product", error: String(error) });
    }
  }

  public async updateProductById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const updatedProduct = await this.productService.updateProductById(
        parseInt(req.params.id),
        req.body
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not update product", error: String(error) });
    }
  }
}