import { Order } from "../entities/Order";
import { Product } from "../entities/Product";
import { HttpClient } from "../infra/http/HttpClient";
import { CheckoutGateway, CheckoutOutput } from "./CheckoutGateway";

export class CheckoutGatewayHttp implements CheckoutGateway {

  constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}
  
  async getProducts(): Promise<Product[]> {
    const productsData = await this.httpClient.get<ProductData[]>(`${this.baseUrl}/products`)
    return productsData.map(p => new Product(p.productId, p.description, p.price));
  }

  async checkout(order: Order): Promise<CheckoutOutput> {
    return await this.httpClient.post<Order, CheckoutOutput>(`${this.baseUrl}/checkout`, order);
  }
}

type ProductData = {
  productId: string;
  description: string;
  price: number;
}