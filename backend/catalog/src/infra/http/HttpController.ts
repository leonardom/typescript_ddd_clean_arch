import { HttpServer } from "shared/infra/http/server";
import { GetProducts, GetProductById } from "../../application/usecase";

export class HttpController {
  constructor(
    readonly httpServer: HttpServer, 
    readonly getProducts: GetProducts,
    readonly getProductById: GetProductById,
  ) {
    httpServer.on("get",  "/products", async (params: any, body: any) => {
      const output = await this.getProducts.execute();
      return output;
    });
    httpServer.on("get",  "/products/:id", async (params: any, body: any) => {
      const output = await this.getProductById.execute(params.id);
      return output;
    });
  }
}