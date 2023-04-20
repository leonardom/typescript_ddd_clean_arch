import { expect, test } from "vitest";
import { CPF } from "../../src/domain/entity";

test.each([
  "407.302.170-27",
  "684.053.160-00",
  "746.971.314-01"
])('Deve testar um cpf valido: %s', (value: string) => {
  const cpf = new CPF(value);
  expect(cpf.value).toBeDefined();
});

test.each([
  "406.302.170-27",
  "406302170",
  "406302170123123"
])('Deve testar um cpf invalido: %s', (value: string) => {
  expect(() => new CPF(value)).toThrow(new Error("Invalid CPF"));
});

test.each([
  "111.111.111-11",
  "22222222222",
])('Deve testar um cpf invalido com todos os dígito iguais: %s', (value: string) => {
  expect(() => new CPF(value)).toThrow(new Error("Invalid CPF"));
});