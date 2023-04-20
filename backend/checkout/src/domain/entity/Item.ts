export class Item {
  constructor(
    readonly productId: string, 
    readonly price: number, 
    readonly quantity: number,
    readonly currency: string,
  ) {}
}