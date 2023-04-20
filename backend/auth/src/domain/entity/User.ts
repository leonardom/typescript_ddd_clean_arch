import { Email } from "./Email";
import { Password } from "./Password";

export class User {
  private constructor(readonly email: Email, readonly password: Password) {}

  static async create(email: string, password: string): Promise<User> {
    return new User(new Email(email), await Password.create(password));
  }

  static async buildExistingUser(email: string, hash: string, salt: string): Promise<User> {
    return new User(new Email(email), new Password(hash, salt));
  }

  async validatePassword(password: string): Promise<boolean> {
    return this.password.validate(password);
  }
}