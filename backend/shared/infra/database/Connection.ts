export interface Connection {
  query(command: string): any;
  close(): void;
}