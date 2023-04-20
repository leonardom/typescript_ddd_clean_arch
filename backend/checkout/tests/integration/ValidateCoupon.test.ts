import { beforeEach, expect, test } from "vitest";
import { CouponRepositoryInMemory } from "../../src/infra/repository/CouponRepositoryInMemory";
import { ValidateCoupon } from "../../src/application/usecase";

let validateCoupon: ValidateCoupon;

const couponRepository = new CouponRepositoryInMemory();

beforeEach(() => {
  validateCoupon = new ValidateCoupon(couponRepository);
})


test("Deve validar um cupom de desconto válido", async () => {
  const input = "VALE20";
  const output = await validateCoupon.execute(input);
  expect(output).toBeTruthy();
});

test("Deve validar um cupom de desconto expirado", async () => {
  const input = "VALE10";
  const output = await validateCoupon.execute(input);
  expect(output).toBeFalsy();
});
