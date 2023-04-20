export function format(amount: number): string {
  return new Intl.NumberFormat("en-uk", { currency: "GBP", style: "currency"}).format(amount);
}