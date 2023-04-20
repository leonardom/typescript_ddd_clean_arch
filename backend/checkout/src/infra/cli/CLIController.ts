import { CLIHandler } from "./CLIHandler";
import { Checkout } from "../../application/usecase";

export class CLIController {
  constructor(readonly handler: CLIHandler, readonly checkout: Checkout) {
    const input: Input = {
      cpf: "",
      items: [],
    }    
    handler.on("set-cpf", (params: string) => {
      input.cpf = params;
    });
    handler.on("add-item", (params: string) => {
      const [productId, quantity] = params.split(" ");
      input.items.push({
        productId, 
        quantity: Number(quantity)
      })
    });
    handler.on("checkout", async (params: string) => {
      try {
        const output = await checkout.execute(input)
        handler.write(JSON.stringify(output));
      } catch (err: any) {
        handler.write(err.message);
      }
    });    
  }
}

type Input = {
  uuid?: string;
  cpf: string;
  items: { productId: string, quantity: number}[],
}
