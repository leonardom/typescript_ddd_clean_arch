import { expect, test } from "vitest";
import axios from "axios";


axios.defaults.validateStatus = function() {
  return true;
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3NjY0ODAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDAwfQ.unH1DdBltWzU_wnx8Siszxah4smESeOIpz5dTEc8v0g";

test("Não deve aceitar um pedido com CPF inválido", async () => {
  const input = {
    cpf: "111.111.111-11",
    token
  }
  const response = await axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output.message).toBe("Invalid CPF");
});

test("Deve criar um pedido vazio", async () => {
  const input = {
    cpf: "407.302.170-27",
    token
  }
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(0);
});

test("Deve criar um pedido com 3 itens", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: 1},
      {productId: "2", quantity: 1},
      {productId: "3", quantity: 3},
    ],
    token
  }
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
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
    coupon: "VALE20",
    token
  }
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
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
    coupon: "VALE10",
    token
  }
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(6090);
});

test("Não deve criar um pedido com quantidade negativa", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: -1},
    ],
    token
  }
  const response = await axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output.message).toBe("Invalid quantity");
});

test("Não deve criar um pedido com item duplicados", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: 1},
      {productId: "1", quantity: 1},
    ],
    token
  }
  const response = await axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output.message).toBe("Duplicated item");
});

test("Deve criar um pedido com 1 item e calcular o frete", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "1", quantity: 3},
    ],
    from: "22060030",
    to: "13873501",
    token
  }
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.freight).toBe(67.33996002073468);
  expect(output.total).toBe(3067.33996002073468);
});


test("Não deve criar um pedido se o produto tiver alguma dimesão negativa", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "4", quantity: 1},
    ],
    from: "22060030",
    to: "13873501",
    token
  }
  const response = await axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output.message).toBe("Invalid dimension");
});

test("Deve criar um pedido com 1 item e calcular o frete com valor mínimo", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {productId: "3", quantity: 1},
    ],
    from: "22060030",
    to: "13873501",
    token
  }
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.freight).toBe(10);
  expect(output.total).toBe(40);
});

test("Deve simular o frete de 3 items", async () => {
  const input = {
    items: [
      {productId: "1", quantity: 1},
      {productId: "2", quantity: 1},
      {productId: "3", quantity: 3},
    ],
    from: "22060030",
    to: "13873501",
    token
  }
  const response = await axios.post("http://localhost:3000/simulateFreight", input);
  const output = response.data;
  expect(output.freight).toBe(280);
});
