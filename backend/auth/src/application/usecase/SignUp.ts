import { User } from "../../domain/entity";
import { UserRepository } from "../repository";

export class SignUp {
  constructor(readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    const user = await User.create(input.email, input.password);
    await this.userRepository.save(user);
  }
}

type Input = {
  email: string;
  password: string;
}