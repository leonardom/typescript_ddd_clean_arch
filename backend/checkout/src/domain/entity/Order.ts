import crypto from "crypto";
import { CPF } from "./CPF";
import { CurrencyTable } from "./CurrencyTable";
import { Item } from "./Item";
import { Product } from "./Product";
import { Coupon } from "./Coupon";

export class Order {
  readonly items: Item[];
  readonly cpf: CPF;
  readonly code: string;
  private coupon?: Coupon;
  freight: number = 0;

  constructor(
    readonly id: string | undefined, 
    cpf: string, 
    readonly currencyTable: CurrencyTable = new CurrencyTable(),
    readonly sequence: number = 1, 
    readonly date: Date = new Date(),
  ) {
    if (!id) this.id = crypto.randomUUID();
    this.items = [];
    this.cpf = new CPF(cpf);
    this.code = `${date.getFullYear()}${new String(sequence).padStart(8, "0")}`;
  }

  addItem(product: Product, quantity: number) {
    if (this.items.some(item => item.productId === product.id)) throw new Error("Duplicated item");
    if (quantity <= 0) throw new Error("Invalid quantity");
    this.items.push(new Item(product.id, product.price, quantity, product.currency));
  }

  getTotal() {
    let total = 0;
    total = this.items.reduce((total, item) => 
      total + item.price * item.quantity * this.currencyTable.getCurrency(item.currency)
    , 0);
    total += this.freight;
    if (this.coupon) total -= this.coupon.calculateDiscount(total);
    return total;
  }
  
  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired(this.date)) this.coupon = coupon;;
  }
}