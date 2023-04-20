import { ProductRepository } from "../repository/ProductRepository";

export class GetProductById {
  constructor(readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Output | undefined> {
    const product = await this.productRepository.findProductById(id);
    if (!product) return Promise.resolve(undefined);
    return Promise.resolve({
      ...product,
      productId: product.id,
      volume: product.getVolume(),
      density: product.getDensity(),
    });
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
}