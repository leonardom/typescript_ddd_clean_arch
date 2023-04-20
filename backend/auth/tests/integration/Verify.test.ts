import { expect, test } from "vitest";
import { Verify } from "../../src/application/usecase";
import { TokenGenerator } from "../../src/domain/TokenGenerator";

test("Deve verificar um token", async () => {
  const tokenGenerator = new TokenGenerator("key");
  const verify = new Verify(tokenGenerator);
  const input = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3NjY0ODAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDAwfQ.unH1DdBltWzU_wnx8Siszxah4smESeOIpz5dTEc8v0g",
  }
  const payload = await verify.execute(input);
  expect(payload.email).toBe("joao@gmail.com");
});