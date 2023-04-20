import { beforeEach, expect, test } from "vitest";
import { AxiosAdapter } from "shared/infra/http/client";
import { SimulateFreight } from "../../src/application/usecase";
import { FreightGatewayHttp } from "../../src/infra/gateway/FreightGatewayHttp";
import { CatalogGatewayHttp } from "../../src/infra/gateway/CatalogGatewayHttp";

let simulateFreight: SimulateFreight;

const httpClient = new AxiosAdapter();
const freightGateway = new FreightGatewayHttp(httpClient);
const catalogGateway = new CatalogGatewayHttp(httpClient);

beforeEach(() => {
  simulateFreight = new SimulateFreight(freightGateway, catalogGateway);
})


test("Deve calcular o frete simulado de um pedido com 3 itens", async () => {
  const input = {
    items: [
      {productId: "1", quantity: 1},
      {productId: "2", quantity: 1},
      {productId: "3", quantity: 3},
    ],
    from: "22060030",
    to: "13873501",
  }
  const output = await simulateFreight.execute(input);
  expect(output.freight).toBe(280);
});
