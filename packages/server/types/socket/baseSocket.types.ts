import type { Server } from 'socket.io';

// Broadcasting
export interface IServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  move: (x: number) => void;
  connection: () => void;
}

// Receiving Event
export interface IClienToServerEvents {
  hello: () => void;
  move: (x: number) => void;
}

// Inter-server
export interface IInterServerEvents {
  ping: () => void;
}

// Socket Data
export interface ISocketData {
  name: string;
  age: number;
}

export type baseSocketServer = Server<
  IClienToServerEvents,
  IServerToClientEvents,
  IInterServerEvents,
  ISocketData
>;
