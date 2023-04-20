import { AuthGatewayHttp } from "../../infra/gateway";
import { AuthGateway } from "../gateway";
import { UseCase } from "../usecase";

export class AuthDecorator implements UseCase {

  constructor(
    readonly usecase: UseCase, 
    readonly authGateway: AuthGateway = new AuthGatewayHttp()
  ) {}

  async execute(input: any): Promise<any> {
    try {
      const output = await this.authGateway.verify(input.token);
      input.loggedUser = output.email
      return this.usecase.execute(input);
    } catch (err) {
      throw new Error("Unauthenticated error");
    }
  }
}