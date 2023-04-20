import { Order } from "../entities/Order";
import { Product } from "../entities/Product";

export interface CheckoutGateway {
  getProducts(): Promise<Product[]>;
  checkout(order: Order): Promise<CheckoutOutput>
}

export type CheckoutOutput = {
  total: number;
  freight: number;
}