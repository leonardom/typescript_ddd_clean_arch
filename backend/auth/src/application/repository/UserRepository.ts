import { User } from "../../domain/entity";

export interface UserRepository {
  save(user: User): Promise<void>;
  get(email: string): Promise<User | undefined>;
}