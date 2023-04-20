import { beforeEach, expect, test } from "vitest";
import { CalculateFreight } from "../../src/application/usecase";
import { ZipcodeRepository } from "../../src/application/repository";
import { Zipcode } from "../../src/domain/entity/Zipcode";

let calculateFreight: CalculateFreight;

beforeEach(() => {
  const zipcodeRepository: ZipcodeRepository = {
    async get(code: string): Promise<Zipcode | undefined> {
      if (code === "22060030") {
        return Promise.resolve(new Zipcode("22060030", "Rua A", "Bairro A", -27.5945, -48.5477));
      }
      if (code === "13873501") {
        return Promise.resolve(new Zipcode("13873501", "Rua B", "Bairro B", -22.9129, -43.2003));
      }
    }
  }
  calculateFreight = new CalculateFreight(zipcodeRepository);
})


test("Deve calcular o frete simulado de um pedido com 2 itens sem cep origem e destino", async () => {
  const input = {
    items: [
      {width: 100, height: 30, length: 10, weight: 3, quantity: 2},
    ],
  }
  const output = await calculateFreight.execute(input);
  expect(output.freight).toBe(60);
});

test("Deve calcular o frete simulado de um pedido com 1 item com cep origem e destino", async () => {
  const input = {
    items: [
      {width: 100, height: 30, length: 10, weight: 3, quantity: 1},
    ],
    from: "22060030",
    to: "13873501",
  }
  const output = await calculateFreight.execute(input);
  expect(output.freight).toBe(22.446653340244893);
});
