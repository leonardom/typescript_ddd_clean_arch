import { expect, test } from "vitest";
import { Email } from "../../src/domain/entity";

test("Deve criar um email válido", () => {
  const email = new Email("joao@gmail.com");
  expect(email.value).toBe("joao@gmail.com");
});

test("Não deve permitir criar um email inválido", () => {
  expect(()=> new Email("joao@gmail")).toThrow(new Error("Invalid email: joao@gmail"));
});