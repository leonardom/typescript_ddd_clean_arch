import { expect, test } from "vitest";
import { User } from "../../src/domain/entity";
import { UserRepository } from "../../src/application/repository";
import { SignIn, SignUp } from "../../src/application/usecase";
import { TokenGenerator } from "../../src/domain/TokenGenerator";

test("Deve criar uma conta paara usuário", async () => {
  const usersData: {[key:string]: User} = {};
  const userRepository: UserRepository = {
    async save(user: User): Promise<void> {
      usersData[user.email.value] = user;
    },

    async get(email: string): Promise<User | undefined> {
      return usersData[email]; 
    }
  }
  const signup = new SignUp(userRepository);
  const input = {
    email: "joao@gmail.com",
    password: "abc123",
    date: new Date("2023-03-01T10:00:00"),
  }
  await signup.execute(input);
  const tokenGenerator = new TokenGenerator("key");
  const sigin = new SignIn(userRepository, tokenGenerator);
  const output = await sigin.execute(input);
  expect(output.token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3NjY0ODAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDAwfQ.unH1DdBltWzU_wnx8Siszxah4smESeOIpz5dTEc8v0g");

});