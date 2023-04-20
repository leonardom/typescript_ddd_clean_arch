import { CatalogGateway, FreightGateway, Input as FreightIput } from "../gateway";

export class SimulateFreight {

  constructor(
    readonly freightGateway: FreightGateway,
    readonly catatogGateway: CatalogGateway,
  ) {}

  async execute(input: Input): Promise<Output> {
    const output: Output = {
      freight: 0,
    };
    if (!input.items) return Promise.resolve(output);
    const freightInput: FreightIput = { items: [] }; 
    for (const item of input.items) {
      const product = await this.catatogGateway.getProductById(item.productId)
      if (product) {
        freightInput.items.push({ 
          width: product.weight, 
          height: product.height, 
          length: product.length, 
          weight: product.weight, 
          quantity: item.quantity
        });
      }
    }
    output.freight = await this.calculateFreight(freightInput);
    return Promise.resolve(output);
  }

  private async calculateFreight(input: FreightIput): Promise<number> {
    const output = await this.freightGateway.calculateFreight(input);
    return output.freight;
  }
}

type Input = {
  items: {
    productId: string,
    quantity: number,
  }[];
}

type Output = {
  freight: number;
}