export interface HttpClient {
  get<T>(url: string): Promise<T>;
  post<T, R>(url: string, body: T): Promise<R>;
}