import { expect, test } from "vitest";
import { Product } from "../../src/domain/entity/Product";

test("Não deve criar um produto com dimensões inválidas", () => {
  expect(() => 
   new Product("1", "A", 1000, -100, 30, 10, 3, 'BRL')
  ).toThrow(new Error("Invalid dimension"));  
});