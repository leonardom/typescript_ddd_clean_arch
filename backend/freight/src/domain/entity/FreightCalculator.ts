const MIN_FREIGHT = 10;

export class FreightCalculator {
  static calculate(distance: number, width: number, height: number, lenght: number, weight: number, quantity: number = 1): number {
    // freight = 1000 * volume * (density/100)
    const volume = width / 100 * height / 100 * lenght / 100;
    const density = weight / volume;
    const itemFreight = distance * volume * (density / 100)
    return Math.max(itemFreight, MIN_FREIGHT) * quantity;
  }
}