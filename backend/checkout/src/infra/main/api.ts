import express from "express";
import { ExpressAdapter } from "shared/infra/http/server";
import { AxiosAdapter } from "shared/infra/http/client";
import { CouponRepositoryInMemory } from "../repository/CouponRepositoryInMemory";
import { FakeCurrencyGateway } from "../gateway/FakeCurrencyGateway";
import { OrderRepositoryInMemory } from "../repository/OrderRepositoryInMemory";
import { Checkout } from "../../application/usecase/Checkout";
import { HttpController } from "../http/HttpController";
import { FreightGatewayHttp } from "../gateway/FreightGatewayHttp";
import { CatalogGatewayHttp } from "../gateway/CatalogGatewayHttp";
import { SimulateFreight } from "../../application/usecase";
import { AuthDecorator } from "../../application/decorator";

const app = express();
app.use(express.json());

const couponRepository = new CouponRepositoryInMemory();
const orderRepository = new OrderRepositoryInMemory();
const currencyGateway = new FakeCurrencyGateway();
const httpClient = new AxiosAdapter();
const freightGateway = new FreightGatewayHttp(httpClient);
const catalogGateway = new CatalogGatewayHttp(httpClient);
const checkout = new Checkout(couponRepository, orderRepository, currencyGateway, freightGateway, catalogGateway);
const simulateFreight = new SimulateFreight(freightGateway, catalogGateway);
const httpServer = new ExpressAdapter();
new HttpController(httpServer, new AuthDecorator(checkout), simulateFreight);
httpServer.service("Checkout").listen(Number(process.env.PORT ?? 3000));