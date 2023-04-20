import { FreightGateway, Input } from "../../application/gateway";
import { HttpClient } from "../http/client/HttpClient";

export class FreightGatewayHttp implements FreightGateway {
  constructor(readonly httpClient: HttpClient) {}

  async calculateFreight(input: Input): Promise<{ freight: number; }> {
    const response = await this.httpClient.post("http://localhost:3001/calculateFreight", input);
    return response;
  }
}