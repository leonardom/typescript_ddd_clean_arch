export class Item {
  private quantity: number = 1;

  constructor(readonly productId: string) {}

  incrementQuantity() {
    this.quantity++;
  }

  getQuantity(): number {
    return this.quantity;
  }
}