import { Coupon } from "../../domain/entity/Coupon";
import { CouponRepository } from "../../application/repository/CouponRepository";

const coupons: CouponData[] = [
  {code: "VALE20", percentage: 20.0, expire_date: new Date("2023-12-31")},
  {code: "VALE10", percentage: 20.0, expire_date: new Date("2023-01-01")}
]

export class CouponRepositoryInMemory implements CouponRepository {
  async findCouponByCode(code: string): Promise<Coupon | undefined> {
    const couponData = coupons.find((c) => code === c.code);
    if (!couponData) return Promise.resolve(undefined);
    return Promise.resolve(new Coupon(couponData.code, couponData.percentage, couponData.expire_date));
  }
}

export type CouponData = {
  code: string;
  percentage: number;
  expire_date: Date;
}
