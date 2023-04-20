import { expect, test } from "vitest";
import { AxiosAdapter } from "shared/infra/http/client";
import { CouponRepositoryInMemory } from "../../src/infra/repository/CouponRepositoryInMemory";
import { OrderRepositoryInMemory } from "../../src/infra/repository/OrderRepositoryInMemory";
import { FakeCurrencyGateway } from "../../src/infra/gateway/FakeCurrencyGateway";
import { Checkout } from "../../src/application/usecase";
import { CLIHandler } from "../../src/infra/cli/CLIHandler";
import { CLIController } from "../../src/infra/cli/CLIController";
import { FreightGatewayHttp } from "../../src/infra/gateway/FreightGatewayHttp";
import { CatalogGatewayHttp } from "../../src/infra/gateway/CatalogGatewayHttp";

test("Deve testar cli", async () => {
  const couponRepository = new CouponRepositoryInMemory();
  const orderRepository = new OrderRepositoryInMemory();
  const currencyGateway = new FakeCurrencyGateway();
  const httpClient = new AxiosAdapter();
  const freightGateway = new FreightGatewayHttp(httpClient);
  const catalogGateway = new CatalogGatewayHttp(httpClient);
  const checkout = new Checkout(couponRepository, orderRepository, currencyGateway, freightGateway, catalogGateway);
  let output:any;
  const handler = new class extends CLIHandler {
    write(text: string): void {
      output = JSON.parse(text);
    }
  }
  new CLIController(handler, checkout);
  handler.type("set-cpf 407.302.170-27");
  handler.type("add-item 1 1");
  handler.type("add-item 2 1");
  handler.type("add-item 3 3");
  await handler.type("checkout");
  expect(output.total).toBe(6090);
  expect(output.freight).toBe(280);
});