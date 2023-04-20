import { CouponRepository } from "../repository/CouponRepository";
import { CurrencyGateway } from "../gateway/CurrencyGateway";
import { CurrencyTable } from "../../domain/entity/CurrencyTable";
import { Order } from "../../domain/entity/Order";
import { OrderRepository } from "../repository/OrderRepository";
import { FreightGateway, Input as FreightIput } from "../gateway/FreightGateway";
import { AuthGateway, CatalogGateway } from "../gateway";
import { AuthGatewayHttp } from "../../infra/gateway";
import { UseCase } from ".";

export class Checkout implements UseCase {

  constructor(
    readonly couponRepository: CouponRepository,
    readonly orderRepository: OrderRepository,
    readonly currencyGateway: CurrencyGateway,
    readonly freightGateway: FreightGateway, 
    readonly catalogGateway: CatalogGateway,
    readonly authGateway: AuthGateway = new AuthGatewayHttp()) {}
    
  async execute(input: Input): Promise<Output> {
    const currencies = await this.currencyGateway.getCurrencies();
    const currencyTable = new CurrencyTable();
    currencyTable.addCurrency("USD", currencies.usd);
    const sequence = await this.orderRepository.count();
    const order = new Order(input.uuid, input.cpf, currencyTable, sequence, new Date());
    const freightInput: FreightIput = { items: [], from: input.from, to: input.to }; 
    if (input.items) {
      for (const item of input.items) {
        const product = await this.catalogGateway.getProductById(item.productId)
        if (product) {
          order.addItem(product, item.quantity);
          freightInput.items.push({ 
            width: product.weight, 
            height: product.height, 
            length: product.length, 
            weight: product.weight, 
            quantity: item.quantity
          });
        }
      }
    }
    const freight = await this.calculateFreight(freightInput);
    if (input.from && input.to) {
      order.freight = freight;
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.findCouponByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    await this.orderRepository.save(order);
    return Promise.resolve({
      total: order.getTotal(),
      freight
    });  
  }

  private async calculateFreight(input: FreightIput): Promise<number> {
    const output = await this.freightGateway.calculateFreight(input);
    return output.freight;
  }
}

type Output = {
  freight: number;
  total: number;
}

type Input = {
  uuid?: string;
  cpf: string;
  items: { productId: string, quantity: number}[],
  coupon?: string;
  from?: string;
  to?: string;
}