import { HttpServer } from "shared/infra/http/server";
import { SignUp, SignIn, Verify } from "../../application/usecase";

export class HttpController {
  constructor(
    readonly httpServer: HttpServer, 
    readonly signUp: SignUp,
    readonly signIn: SignIn,
    readonly verify: Verify,
  ) {
    httpServer.on("post",  "/signup", async (params: any, body: any) => {
      const output = await this.signUp.execute(body);
      return output;
    });
    httpServer.on("post",  "/signin", async (params: any, body: any) => {
      if (body.date) {
        body.date = new Date(body.date);
      }
      const output = await this.signIn.execute(body);
      return output;
    });
    httpServer.on("post",  "/verify", async (params: any, body: any) => {
      const output = await this.verify.execute(body);
      return output;
    });
  }
}