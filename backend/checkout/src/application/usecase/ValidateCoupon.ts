import { Coupon } from "../../domain/entity/Coupon";
import { CouponRepository } from "../repository/CouponRepository";

export class ValidateCoupon {
  constructor(readonly couponRepository: CouponRepository) {}

  async execute(input: string): Promise<boolean> {
    const coupon = await this.couponRepository.findCouponByCode(input);
    return Promise.resolve(!!coupon && this.isCouponValid(coupon));
  }

  private isCouponValid(coupon: Coupon): boolean {
    return !coupon.isExpired(new Date());
  }
}