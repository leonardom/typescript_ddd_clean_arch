import express, { Request, Response } from "express";
import { HttpServer } from "./HttpServer";
import cors from "cors";

export class ExpressAdapter implements HttpServer {
  app: any;
  name: string = "";

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }
  
  service(name: string): HttpServer {
    this.name = name;
    return this;
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async (req: Request, res: Response) => {
      try {
        const output = await callback(req.params, req.body);
        res.json(output);
      } catch (err: any){
        res.status(422).json({message: err.message});
      }    
    });
  }
  
  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`🚀 Service ${this.name} listening on port ${port}...`);
    });
  }

}