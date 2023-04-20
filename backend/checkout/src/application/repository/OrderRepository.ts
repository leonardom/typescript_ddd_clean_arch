import { Order } from "../../domain/entity/Order";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  getById(id: string): Promise<Order | undefined>;
  count(): Promise<number>;
}