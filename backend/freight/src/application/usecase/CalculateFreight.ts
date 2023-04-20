import { DistanceCalculator } from "../../domain/entity";
import { FreightCalculator } from "../../domain/entity/FreightCalculator";
import { ZipcodeRepository} from "../repository";

export class CalculateFreight {

  constructor(readonly zipcodeRepository: ZipcodeRepository) {}

  async execute(input: Input): Promise<Output> {
    const output: Output = {
      freight: 0,
    };
    if (!input.items) return Promise.resolve(output);

    let distance = 1000;
    if (input.from && input.to) {
      const from = await this.zipcodeRepository.get(input.from);
      const to = await this.zipcodeRepository.get(input.to);
      if (from && to) {
        distance = DistanceCalculator.calculate(from.coord, to.coord);
      }
    }
    for (const item of input.items) {
      const itemFreight = FreightCalculator.calculate(distance, item.width, item.height, item.length, item.weight, item.quantity);
      output.freight += itemFreight;
    }
    return Promise.resolve(output);
  }
}

type Input = {
  items: {
    width: number;
    height: number;
    length: number;
    weight: number;
    quantity: number;
  }[];
  from?: string;
  to?: string;
}

type Output = {
  freight: number;
}