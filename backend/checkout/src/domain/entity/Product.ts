export class Product {
  constructor(
    readonly id: string, 
    readonly description: string, 
    readonly price: number, 
    readonly width: number,
    readonly height: number, 
    readonly length: number,
    readonly weight: number, 
    readonly currency: string
  ) {
    if (width <= 0 || height <= 0 || length <= 0 || weight <= 0) throw new Error("Invalid dimension");
  } 

  getVolume(): number {
    return this.width / 100 * this.height / 100 * this.length / 100;
  }
}