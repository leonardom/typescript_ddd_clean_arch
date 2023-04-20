import express from "express";
import { UserRepositoryInMemory } from "../repository";
import { HttpController } from "../http/HttpController";
import { ExpressAdapter } from "shared/infra/http/server";
import { SignUp, SignIn, Verify } from "../../application/usecase";
import { TokenGenerator } from "../../domain/TokenGenerator";

const app = express();
app.use(express.json());

const userRepository = new UserRepositoryInMemory();
const signUp = new SignUp(userRepository);
const tokenGenerator = new TokenGenerator("key");
const signIn = new SignIn(userRepository, tokenGenerator);
const verify = new Verify(tokenGenerator);
const httpServer = new ExpressAdapter();
new HttpController(httpServer, signUp, signIn, verify);
httpServer.service("Auth").listen(Number(process.env.PORT ?? 3003));