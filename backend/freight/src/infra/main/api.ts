import express from "express";
import { HttpController } from "../http/HttpController";
import { ExpressAdapter } from "shared/infra/http/server";
import { CalculateFreight } from "../../application/usecase";
import { ZipcodeRepositoryInMemory } from "../../infra/repository";

const app = express();
app.use(express.json());

const zipcodeRepository = new ZipcodeRepositoryInMemory();
const calculareFreight = new CalculateFreight(zipcodeRepository);
const httpServer = new ExpressAdapter();
new HttpController(httpServer, calculareFreight);
httpServer.service("Freight").listen(Number(process.env.PORT ?? 3001));