import { beforeEach, expect, test } from "vitest";
import sinon from "sinon";
import crypto from "crypto";
import { AxiosAdapter } from "shared/infra/http/client";
import { CouponRepositoryInMemory } from "../../src/infra/repository/CouponRepositoryInMemory";
import { FakeCurrencyGateway } from "../../src/infra/gateway/FakeCurrencyGateway";
import { GetOrder } from "../../src/application/usecase/GetOrder";
import { OrderRepositoryInMemory } from "../../src/infra/repository/OrderRepositoryInMemory";
import { Checkout } from "../../src/application/usecase/Checkout";
import { FreightGatewayHttp } from "../../src/infra/gateway/FreightGatewayHttp";
import { CatalogGatewayHttp } from "../../src/infra/gateway/CatalogGatewayHttp";
import { AuthDecorator, LogDecorator } from "../../src/application/decorator";

let checkout: Checkout;
let getOrder: GetOrder;
const couponRepository = new CouponRepositoryInMemory();
const orderRepository = new OrderRepositoryInMemory();
const currencyGateway = new FakeCurrencyGateway();
const httpClient = new AxiosAdapter();
const freightGateway = new FreightGatewayHttp(httpClient);
const catalogGateway = new CatalogGatewayHttp(httpClient);

beforeEach(() => {
  checkout = new Checkout(couponRepository, orderRepository, currencyGateway, freightGateway, catalogGateway);
  getOrder = new GetOrder(orderRepository);
})

test("Não deve aceitar um pedido com CPF inválido", async () => {
  const input = {
    cpf: "111.111.111-11",
    items: []
  }
  await expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid CPF"));
});

test("Deve criar um pedido vazio", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [],
  }
  const output = await checkout.execute(input);
  expect(output.total).toBe(0);
});

test("Deve criar um pedido com 3 itens", async () => {
  const uuid = crypto.randomUUID();
  const input = {
    uuid,
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: 1},
      {productId: "2", quantity: 1},
      {productId: "3", quantity: 3},
    ]
  }
  await checkout.execute(input);
  const output = await getOrder.execute(uuid);
  expect(output.total).toBe(6090);
});

test("Deve criar um pedido com 3 itens e com cupom de desconto", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: 1},
      {productId: "2", quantity: 1},
      {productId: "3", quantity: 3},
    ],
    coupon: "VALE20"
  }
  const output = await checkout.execute(input);
  expect(output.total).toBe(4872);
});

test("Deve criar um pedido com 3 itens e com cupom expirado", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: 1},
      {productId: "2", quantity: 1},
      {productId: "3", quantity: 3},
    ],
    coupon: "VALE10"
  };
  const output = await checkout.execute(input);
  expect(output.total).toBe(6090);
});

test("Não deve criar um pedido com quantidade negativa", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: -1},
    ]
  };
  await expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid quantity"));
});

test("Não deve criar um pedido com item duplicados", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: 1},
      {productId: "1", quantity: 1},
    ]
  };
  await expect(() => checkout.execute(input)).rejects.toThrow(new Error("Duplicated item"));
});

test("Deve criar um pedido com 1 item e calcular o frete", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: 3},
    ],
    from: "22060030",
    to: "13873501",
  }
  const output = await checkout.execute(input);
  expect(output.freight).toBe(67.33996002073468);
  expect(output.total).toBe(3067.339960020735);
});


test("Não deve criar um pedido se o produto tiver alguma dimesão negativa", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "4", quantity: 1},
    ],
    from: "22060030",
    to: "13873501",
  };
  await expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid dimension"));
});

test("Deve criar um pedido com 1 item e calcular o frete com valor mínimo", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "3", quantity: 1},
    ],
    from: "22060030",
    to: "13873501",
  }
  const output = await checkout.execute(input);
  expect(output.freight).toBe(10);
  expect(output.total).toBe(40);
});

test("Deve criar um pedido em dolar", async () => {
  const stub = sinon.stub(FakeCurrencyGateway.prototype, "getCurrencies").resolves({
    usd: 3.0
  })
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "5", quantity: 1},
    ],
  }
  const output = await checkout.execute(input);
  expect(output.total).toBe(3000);
  stub.restore();
});

test("Deve criar um pedido com 3 itens e com cupom de desconto com spy", async () => {
  const catalogGatewaySpy = sinon.spy(CatalogGatewayHttp.prototype, "getProductById");
  const couponRepositorySpy = sinon.spy(CouponRepositoryInMemory.prototype, "findCouponByCode");
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: 1},
      {productId: "2", quantity: 1},
      {productId: "3", quantity: 3},
    ],
    coupon: "VALE20"
  }
  const output = await checkout.execute(input);
  expect(output.total).toBe(4872);
  expect(couponRepositorySpy.calledOnce).toBeTruthy();
  expect(couponRepositorySpy.calledWith("VALE20")).toBeTruthy();
  expect(catalogGatewaySpy.calledThrice).toBeTruthy();
  couponRepositorySpy.restore();
  catalogGatewaySpy.restore();
});

test("Deve criar um pedido em dolar com mock", async () => {
  const mockCurrencyGateway = sinon.mock(FakeCurrencyGateway.prototype);
  mockCurrencyGateway.expects("getCurrencies").atLeast(1).resolves({
    usd: 3
  });
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "5", quantity: 1},
    ],
  }
  const output = await checkout.execute(input);
  expect(output.total).toBe(3000);
  mockCurrencyGateway.verify();
  mockCurrencyGateway.restore();
});

test("Deve criar um pedido e verificar código de série do pedido", async () => {
  const uuid = crypto.randomUUID();
  const stub = sinon.stub(OrderRepositoryInMemory.prototype, "count").resolves(1);
  const input = {
    uuid,
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: 1},
      {productId: "2", quantity: 1},
      {productId: "3", quantity: 3},
    ]
  }
  await checkout.execute(input);
  const output = await getOrder.execute(uuid);
  expect(output.code).toBe("202300000001");
  stub.restore();
});

test("Deve criar um pedido com 1 item e com cep", async () => {
  const uuid = crypto.randomUUID();
  const input = {
    uuid,
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: 1},
    ],
    from: "22060030",
    to: "13873501",
  }
  await checkout.execute(input);
  const output = await getOrder.execute(uuid);
  expect(output.total).toBe(1022.4466533402449);
});

test("Deve criar um pedido com 3 itens e com cupom de desconto somente se estiver autenticado", async () => {
  const authCheckout = new AuthDecorator(new LogDecorator(checkout));
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: 1},
      {productId: "2", quantity: 1},
      {productId: "3", quantity: 3},
    ],
    coupon: "VALE20",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3NjY0ODAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDAwfQ.unH1DdBltWzU_wnx8Siszxah4smESeOIpz5dTEc8v0g",
  }
  const output = await authCheckout.execute(input);
  expect(output.total).toBe(4872);
});

test("Não deve criar um pedido se estiver não autenticado", async () => {
  const authCheckout = new AuthDecorator(checkout);
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: 1},
      {productId: "2", quantity: 1},
      {productId: "3", quantity: 3},
    ],
    coupon: "VALE20",
    token: "eeehbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3NjY0ODAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDAwfQ.unH1DdBltWzU_wnx8Siszxah4smESeOIpz5dTEc8v0g",
  }
  await expect(() => authCheckout.execute(input)).rejects.toThrow(new Error("Unauthenticated error"));
});