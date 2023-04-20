import { TokenGenerator } from "../../domain/TokenGenerator";
import { User } from "../../domain/entity";
import { UserRepository } from "../repository";

export class Verify {
  constructor(readonly tokenGenerator: TokenGenerator) {}

  async execute(input: Input): Promise<any> {
    return this.tokenGenerator.verify(input.token);
  }
}

type Input = {
  token: string;
}