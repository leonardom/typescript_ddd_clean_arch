import { format } from "../formattter/MoneyFormatter";

export class Product {
  constructor(
    readonly productId: string, 
    readonly description: string,
    readonly price:number
  ) {}

  getFormattedPrice(): string {
    return format(this.price)
  }
}