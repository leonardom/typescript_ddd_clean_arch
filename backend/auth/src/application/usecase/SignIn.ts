import { TokenGenerator } from "../../domain/TokenGenerator";
import { UserRepository } from "../repository";

export class SignIn {
  constructor(readonly userRepository: UserRepository, readonly tokenGenerator: TokenGenerator) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.get(input.email);
    if (!user) throw new Error("Authentication failed");
    const valid = user.validatePassword(input.password);
    if (!valid) throw new Error("Authentication failed");
    const token = this.tokenGenerator.generate(user, 10000000, input.date);
    return {
      token,
    }
  }
}

type Input = {
  email: string;
  password: string;
  date: Date;
}

type Output = {
  token: string;
}