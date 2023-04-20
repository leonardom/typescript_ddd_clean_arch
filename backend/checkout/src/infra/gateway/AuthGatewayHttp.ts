import { AxiosAdapter, HttpClient } from "shared/infra/http/client";
import { AuthGateway } from "../../application/gateway";

export class AuthGatewayHttp implements AuthGateway {

  constructor(readonly httpClient: HttpClient = new AxiosAdapter()) {}
  
  async verify(token: string): Promise<any> {
    const response = await this.httpClient.post("http://localhost:3003/verify", { token });
    return response;
  }

}
