import axios, { AxiosResponse } from "axios";
import { HttpClient } from "./HttpClient";

export class AxiosAdapter implements HttpClient {
  
  async get<T>(url: string): Promise<T> {
    const reponse = await axios.get<T>(url);
    return reponse.data;
  }

  async post<T,R>(url: string, body: T): Promise<R> {
    const reponse = await axios.post<T, AxiosResponse<R>>(url, body);
    return reponse.data;
  }
}