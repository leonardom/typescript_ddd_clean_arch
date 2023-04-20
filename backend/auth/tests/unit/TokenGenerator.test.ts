import { expect, test } from "vitest";
import { User } from "../../src/domain/entity";
import { TokenGenerator } from "../../src/domain/TokenGenerator";

test("Deve gerar o token do usuario", async () => {
  const user = await User.create("joao@gmail.com", "abc123");
  const expiresIn = 10000000;
  const issueDate = new Date("2023-03-01T10:00:00");
  const tokenGenerator = new TokenGenerator("key");
  const token = tokenGenerator.generate(user, expiresIn, issueDate);
  expect(token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3NjY0ODAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDAwfQ.unH1DdBltWzU_wnx8Siszxah4smESeOIpz5dTEc8v0g");
});

test("Deve validar o token do usuario", async () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3NjY0ODAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDAwfQ.unH1DdBltWzU_wnx8Siszxah4smESeOIpz5dTEc8v0g";
  const user = await User.create("joao@gmail.com", "abc123");
  const tokenGenerator = new TokenGenerator("key");
  const payload = tokenGenerator.verify(token);
  expect(payload).toBeDefined();
  expect(payload.email).toBe("joao@gmail.com");
});

test("Deve tentar validar o token inválido", async () => {
  const token = "eeehbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3NjY0ODAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDAwfQ.unH1DdBltWzU_wnx8Siszxah4smESeOIpz5dTEc8v0g";
  const user = await User.create("joao@gmail.com", "abc123");
  const tokenGenerator = new TokenGenerator("key");
  expect(() =>  tokenGenerator.verify(token)).toThrow(new Error("invalid token"));
});