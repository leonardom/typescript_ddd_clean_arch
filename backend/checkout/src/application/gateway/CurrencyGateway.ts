export interface CurrencyGateway {
  getCurrencies(): Promise<Currency>;
}

export type Currency = {
  usd: number;
}