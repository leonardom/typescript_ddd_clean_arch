import { expect, test } from "vitest";
import { ProductRepositoryInMemory } from "../../src/infra/repository";
import { GetProducts } from "../../src/application/usecase";

test("Deve listar os produtos", async () => {
  const productsRepository = new ProductRepositoryInMemory();
  const getProducts = new GetProducts(productsRepository);
  const output = await getProducts.execute();
  expect(output).toHaveLength(3);
});