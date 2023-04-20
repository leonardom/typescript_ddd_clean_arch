import { Product } from "../../domain/entity/Product";

export interface ProductRepository {
  findProductById(productId: string): Promise<Product | undefined>;
  getProducts(): Promise<Product[]>;
}