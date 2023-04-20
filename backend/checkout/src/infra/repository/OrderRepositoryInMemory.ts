import { Item } from "../../domain/entity/Item";
import { Order } from "../../domain/entity/Order";
import { OrderRepository } from "../../application/repository/OrderRepository";

const orders: OrderData[] = [];

export class OrderRepositoryInMemory implements OrderRepository {
  
  count(): Promise<number> {
    return Promise.resolve(orders.length);
  }

  save(order: Order): Promise<void> {
    const orderData = {
      id: order.id!,
      cpf: order.cpf.value,
      code: order.code,
      freight: order.freight,
      total: order.getTotal(),
      items: order.items.map(item => ({
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        currency: item.currency,
      }))
    }
    orders.push(orderData);
    return Promise.resolve();
  }
  
  getById(id: string): Promise<Order | undefined> {
    const orderData = orders.find(order => order.id === id);
    if (!orderData) return Promise.resolve(undefined);
    const order = new Order(orderData.id, orderData?.cpf, undefined, 1, new Date());
    for (const itemData of orderData.items) {
      order.items.push(new Item(itemData.productId, itemData.price, itemData.quantity, itemData.currency));
    }
    order.freight = orderData.freight;
    return Promise.resolve(order);
  }
}

type OrderData = {
  id: string;
  cpf: string;
  code: string;
  total: number;
  freight: number;
  items: {productId: string, price: number, quantity: number, currency: string}[]
}
