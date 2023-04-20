import { expect, test } from "vitest";
import { FreightCalculator } from "../../src/domain/entity/FreightCalculator";

test("Deve calcular o frete do produto", () => {
  const freight = FreightCalculator.calculate(1000, 100, 30, 10, 3);
  expect(freight).toBe(30)
});

test("Deve calcular o frete do produto com quantidade 3", () => {
  const freight = FreightCalculator.calculate(1000, 100, 30, 10, 3, 3);
  expect(freight).toBe(90)
});

test("Deve calcular o frete do produto com preço mínimo", () => {
  const freight = FreightCalculator.calculate(1000, 10, 10, 10, 0.9);
  expect(freight).toBe(10)
});