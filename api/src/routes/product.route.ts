// src/routes/productRoutes.ts
import { Router } from "express";
import { DataSource } from "typeorm";
import { ProductController } from "../controllers/product.controller";
import { ProductService } from "../services/product.service";

export default function productRoutes(dataSource: DataSource) {
  const router: Router = Router();
  const productService = new ProductService(dataSource);
  const productController = new ProductController(productService);

  router.post("/products", (req, res) =>
    productController.createProduct(req, res)
  );
  router.post("/products/bulk", (req, res) =>
    productController.createProducts(req, res)
  );
  router.get("/products", (req, res) =>
    productController.getAllProducts(req, res)
  );
  router.get("/products/:id", (req, res) =>
    productController.getProductById(req, res)
  );
  router.patch("/products/:id", (req, res) =>
    productController.updateProductById(req, res)
  );
  router.delete("/products/:id", (req, res) =>
    productController.deleteProductById(req, res)
  );
  router.get("/products/:id/:token", (req, res) =>
    productController.getProductByIdWithToken(req, res)
  );
  router.get("/products/:id/status", (req, res) => {
    productController.getStatusById(req, res);
  });
  router.patch("/products/:id/status", (req, res) => {
    productController.updateStatusById(req, res);
  });

  return router;
}