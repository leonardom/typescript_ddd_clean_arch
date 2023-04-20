import { pbkdf2, randomBytes } from "crypto";

const ITERATIONS = 100;
const KEY_SIZE = 64;
const DIGEST = "sha512";

export class Password {
  constructor(readonly value: string, readonly salt: string) {}

  static async create(password: string, salt?: string): Promise<Password> {
    const generatedSalt = salt ?? randomBytes(20).toString("hex");
    const cryptedPassword = await Password.crypt(password, generatedSalt);
    return new Password(cryptedPassword, generatedSalt);
  }

  async validate(password: string): Promise<boolean> {
    const cryptedPassword = await Password.crypt(password, this.salt);
    return cryptedPassword === this.value;
  }

  private static crypt(password: string, salt: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      pbkdf2(password, salt, ITERATIONS, KEY_SIZE, DIGEST, (err, value) => {
        resolve(value.toString("hex"));
      });
    })
  }
}