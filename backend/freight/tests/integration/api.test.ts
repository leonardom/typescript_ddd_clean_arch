import axios from "axios";
import { expect, test } from "vitest";

test("Deve testar o cálculo de frete sem cep",async () => {
  const input = {
    items: [
      {width: 100, height: 30, length: 10, weight: 3, quantity: 2},
    ],
  }
  const response = await axios.post("http://localhost:3001/calculateFreight", input);
  const output = response.data;
  expect(output.freight).toBe(60);
});

test("Deve testar o cálculo de frete com cep",async () => {
  const input = {
    items: [
      {width: 100, height: 30, length: 10, weight: 3, quantity: 2},
    ],
    from: "22060030",
    to: "13873501",
  }
  const response = await axios.post("http://localhost:3001/calculateFreight", input);
  const output = response.data;
  expect(output.freight).toBe(44.893306680489786);
});