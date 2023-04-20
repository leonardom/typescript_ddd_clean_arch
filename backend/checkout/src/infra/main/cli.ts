import { AxiosAdapter } from "shared/infra/http/client";
import { CLIController } from "../cli/CLIController";
import { CLIHandlerNode } from "../cli/CLIHandlerNode";
import { CouponRepositoryInMemory } from "../repository/CouponRepositoryInMemory";
import { OrderRepositoryInMemory } from "../repository/OrderRepositoryInMemory";
import { FakeCurrencyGateway } from "../gateway/FakeCurrencyGateway";
import { Checkout } from "../../application/usecase";
import { FreightGatewayHttp } from "../gateway/FreightGatewayHttp";
import { CatalogGatewayHttp } from "../gateway/CatalogGatewayHttp";

const couponRepository = new CouponRepositoryInMemory();
const orderRepository = new OrderRepositoryInMemory();
const currencyGateway = new FakeCurrencyGateway();
const httpClient = new AxiosAdapter();
const freightGateway = new FreightGatewayHttp(httpClient);
const catalogGateway = new CatalogGatewayHttp(httpClient);
const checkout = new Checkout(couponRepository, orderRepository, currencyGateway, freightGateway, catalogGateway);

const handler = new CLIHandlerNode();
new CLIController(handler, checkout);
