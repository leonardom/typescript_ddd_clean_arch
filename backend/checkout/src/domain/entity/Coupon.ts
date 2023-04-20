export class Coupon {
  constructor(readonly code: string, readonly percentage: number, readonly expireDate: Date) {}
  
  isExpired(today: Date): boolean {
    return this.expireDate.getTime() < today.getTime()
  }

  calculateDiscount(amount: number): any {
    return amount * this.percentage / 100;
  }
}