export interface HttpServer {
  service(name: string): HttpServer;
  on(method: string, url: string, callback: Function): void;
  listen(port: number): void;
}