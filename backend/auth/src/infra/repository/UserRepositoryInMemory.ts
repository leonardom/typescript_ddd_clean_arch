import { UserRepository } from "../../application/repository";
import { User } from "../../domain/entity";

export class UserRepositoryInMemory implements UserRepository {
  usersData: {[key:string]: User} = {}; 

  async save(user: User): Promise<void> {
    this.usersData[user.email.value] = user;
  }

  async get(email: string): Promise<User | undefined> {
    return this.usersData[email]; 
  }
}