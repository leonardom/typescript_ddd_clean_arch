import { Product } from "../../domain/entity";

export interface CatalogGateway {
  getProducts(): Promise<Product[]>
  getProductById(id: string): Promise<Product>;
}