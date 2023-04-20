import { OrderRepository } from "../repository/OrderRepository";

export class GetOrder {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute (uuid: string): Promise<Output> {
    const output: Output = {
      code: "",
      freight: 0,
      total: 0
    };
    const order = await this.orderRepository.getById(uuid);
    if (!order) return Promise.resolve(output);
    output.code = order.code;
    output.total = order.getTotal();
    output.freight = order.freight;
    return Promise.resolve(output);
  }
}

type Output = {
  code: string;
  freight: number;
  total: number;
}
