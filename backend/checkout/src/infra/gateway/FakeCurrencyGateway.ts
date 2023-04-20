import { Currency, CurrencyGateway } from "../../application/gateway/CurrencyGateway";

export class FakeCurrencyGateway implements CurrencyGateway {
  async getCurrencies(): Promise<Currency> {
    return Promise.resolve({
      usd: 3.0 + Math.random()
    });
  }
}