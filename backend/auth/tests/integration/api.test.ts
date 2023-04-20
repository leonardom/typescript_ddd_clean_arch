import { expect, test } from "vitest";
import { AxiosAdapter } from "shared/infra/http/client";

const httpClient = new AxiosAdapter();

test("Deve validar o flux de autenticação", async () => {
  const input = {
    email: "joao@gmail.com",
    password: "abc123",
    date: new Date("2023-03-01T10:00:00"),
  }
  await httpClient.post("http://localhost:3003/signup", input);
  const {token} = await httpClient.post("http://localhost:3003/signin", input);
  expect(token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3NjY0ODAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDAwfQ.unH1DdBltWzU_wnx8Siszxah4smESeOIpz5dTEc8v0g");

  const output = await httpClient.post("http://localhost:3003/verify", { token });
  expect(output.email).toBe("joao@gmail.com");
});
