import { ProductRepository } from "../repository/ProductRepository";

export class GetProducts {
  constructor(readonly productRepository: ProductRepository) {}

  async execute(): Promise<Output> {
    const products = await this.productRepository.getProducts();
    return Promise.resolve(products.map(p => ({
      ...p,
      productId: p.id,
      volume: p.getVolume(),
      density: p.getDensity(),
    })));
  }
}

type Output = {
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
}[]