import { HttpServer } from "shared/infra/http/server";
import { Checkout, SimulateFreight, UseCase } from "../../application/usecase";

export class HttpController {
  constructor(
    readonly httpServer: HttpServer, 
    readonly checkout: UseCase, 
    readonly simulateFreight: SimulateFreight,
  ) {
    httpServer.on("post",  "/checkout", async (params: any, body: any) => {
      const output = await this.checkout.execute(body);
      return output;
    });

    httpServer.on("post",  "/simulateFreight", async (params: any, body: any) => {
      const output = await this.simulateFreight.execute(body);
      return output;
    });
  }
}