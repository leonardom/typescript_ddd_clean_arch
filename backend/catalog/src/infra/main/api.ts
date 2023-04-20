import express from "express";
import { ProductRepositoryInMemory } from "../repository/ProductRepositoryInMemory";
import { HttpController } from "../http/HttpController";
import { ExpressAdapter } from "shared/infra/http/server";
import { GetProducts, GetProductById } from "../../application/usecase";

const app = express();
app.use(express.json());

const productRepository = new ProductRepositoryInMemory();
const getProducts = new GetProducts(productRepository);
const getProductById = new GetProductById(productRepository);
const httpServer = new ExpressAdapter();
new HttpController(httpServer, getProducts, getProductById);
httpServer.service("Catalog").listen(Number(process.env.PORT ?? 3002));