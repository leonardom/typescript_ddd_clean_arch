import { User } from "./entity";
import { sign, verify, JwtPayload } from "jsonwebtoken";

 export class TokenGenerator {

  constructor(readonly key: string) {}

  generate(user: User, expiresIn: number, issueDate: Date): string {
    return sign({
      email: user.email.value,
      iat: issueDate.getTime(),
      expiresIn,
    }, this.key);
  }

  verify(token: string): any {
    return verify(token, this.key);
  }
 }