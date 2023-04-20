import { HttpClient } from "shared/infra/http/client";
import { CatalogGateway } from "../../application/gateway";
import { Product } from "../../domain/entity";

export class CatalogGatewayHttp implements CatalogGateway {
  
  constructor(readonly httpClient: HttpClient) {}

  async getProducts(): Promise<Product[]> {
    const response = await this.httpClient.get<ProductData[]>("http://localhost:3002/products");
    return response.map(p => this.toEntity(p));

  }

  async getProductById(id: string): Promise<Product> {
    const response = await this.httpClient.get<ProductData>(`http://localhost:3002/products/${id}`);
    return this.toEntity(response);
  }

  private toEntity(productData: ProductData): Product {
    return new Product(
      productData.productId, 
      productData.description, 
      productData.price,
      productData.width,
      productData.height,
      productData.length,
      productData.weight,
      productData.currency
    );
  }
}

type ProductData = {
  productId: string;
  description: string;
  price: number;
  width: number;
  height: number;
  length: number;
  weight: number;
  currency: string;
  volume: number;
  density: number;
}