import { Product } from "../../domain/entity/Product";
import { ProductRepository } from "../../application/repository/ProductRepository";

const products: ProductData[] = [
  {productId: "1", description: "A", price: 1000, width: 100, height: 30, length: 10, weight: 3, currency: "BRL"},
  {productId: "2", description: "B", price: 5000, width: 50, height: 50, length: 50, weight: 22, currency: "BRL"},
  {productId: "3", description: "C", price: 30, width: 10, height: 10, length: 10, weight: 0.9, currency: "BRL"},
  {productId: "4", description: "D", price: 30, width: -10, height: 10, length: 10, weight: 0.9, currency: "BRL"},
  {productId: "5", description: "E", price: 1000, width: 100, height: 30, length: 10, weight: 3, currency: "USD"},
]

export class ProductRepositoryInMemory implements ProductRepository {
  async findProductById(productId: string): Promise<Product | undefined> {
    const productData = products.find((p) => p.productId === productId);
    if (!productData) return Promise.resolve(undefined);
    const product = new Product(
      productData.productId, 
      productData.description, 
      productData.price,
      productData.width,
      productData.height,
      productData.length,
      productData.weight,
      productData.currency
    )
    return Promise.resolve(product);
  }

  async getProducts(): Promise<Product[]> {
    const filteredProducts = products.filter(p => ["1", "2", "3"].includes(p.productId));
    return Promise.resolve(filteredProducts.map(p => this.toEntity(p)));
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
}