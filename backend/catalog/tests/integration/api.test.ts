import { expect, test } from "vitest";
import { AxiosAdapter } from "shared/infra/http/client";

const httpClient = new AxiosAdapter();

test("Deve retornar os produtos", async () => {
  const output = await httpClient.get("http://localhost:3002/products");
  expect(output).toHaveLength(3);
});

test("Deve retornar um produto por id", async () => {
  const output = await httpClient.get("http://localhost:3002/products/1");
  expect(output).toBeDefined();
  expect(output?.productId).toBe("1");
  expect(output?.description).toBe("A");
  expect(output?.price).toBe(1000);
  expect(output?.volume).toBe(0.03);
  expect(output?.density).toBe(0.01);
});

test("Deve retornar um erro se produto tiver dimensão inválida", async () => {
  expect(() => httpClient.get("http://localhost:3002/products/4")).rejects.toThrow(new Error("Invalid dimension"));
});
