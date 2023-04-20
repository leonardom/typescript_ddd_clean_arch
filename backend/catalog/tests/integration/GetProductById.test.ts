import { expect, test } from "vitest";
import { ProductRepositoryInMemory } from "../../src/infra/repository";
import { GetProductById } from "../../src/application/usecase";

test("Deve listar os produtos", async () => {
  const productsRepository = new ProductRepositoryInMemory();
  const getProductById = new GetProductById(productsRepository);
  const output = await getProductById.execute("1");
  expect(output).toBeDefined();
  expect(output?.productId).toBe("1");
  expect(output?.description).toBe("A");
  expect(output?.price).toBe(1000);
  expect(output?.volume).toBe(0.03);
  expect(output?.density).toBe(0.01);
});