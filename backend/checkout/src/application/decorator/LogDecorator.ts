import { UseCase } from "../usecase";

export class LogDecorator implements UseCase {

  constructor(
    readonly usecase: UseCase
  ) {}

  async execute(input: any): Promise<any> {
    try {
      console.log(`Executing usecase ${this.usecase.constructor.name} with input: ${JSON.stringify(input, null, 2)}`);
      const output = await this.usecase.execute(input);
      console.log(`Usecase response: ${JSON.stringify(output, null, 2)}`);
      return output;
    } catch (err) {
      throw new Error("Unauthenticated error");
    }
  }
}