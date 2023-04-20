import { CLIHandler } from "./CLIHandler";

export class CLIHandlerNode extends CLIHandler {
  constructor() {
    super();
    process.stdin.on("data", async (chunk) => {
      const command = chunk.toString().replace(/\n/g, "");
      await this.type(command);
    });
  }
  write(text: string): void {
    console.log(text);;
  }
}