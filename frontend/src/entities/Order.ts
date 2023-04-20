import { Item } from "./Item";
import { Product } from "./Product";

export class Order {
  readonly items: Item[] = [];
  private total: number = 0;

  constructor(readonly cpf: string) {}

  addItem(product: Product) {
    const existingItem = this.items.find((item: Item) => item.productId === product.productId);
    if (existingItem) {
      existingItem.incrementQuantity();
    } else {
      this.items.push(new Item(product.productId));
    }
    this.total += product.price;
  }

  getTotal() {
    return this.total;
  }
}