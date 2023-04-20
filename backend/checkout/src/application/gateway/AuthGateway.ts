export interface AuthGateway {
  verify(token: string): Promise<any>;
}