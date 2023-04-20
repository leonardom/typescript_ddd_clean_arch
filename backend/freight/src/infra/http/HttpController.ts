import { HttpServer } from "./server/HttpServer";
import { CalculateFreight } from "../../application/usecase";

export class HttpController {
  constructor(
    readonly httpServer: HttpServer, 
    readonly calculateFreight: CalculateFreight, 
  ) {
    httpServer.on("post",  "/calculateFreight", async (params: any, body: any) => {
      const output = await this.calculateFreight.execute(body);
      return output;
    });
  }
}