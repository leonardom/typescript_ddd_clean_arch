import { Coupon } from "../../domain/entity/Coupon";

export interface CouponRepository {
  findCouponByCode(code: string): Promise<Coupon | undefined>
}