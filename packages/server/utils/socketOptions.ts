export const socketOptions = {
  cors: {
    origin: 'http://localhost:3000',
  },
  connectTimeout: 30000,
  pingTimeout: 25000,
  transport: ['websocket'],
};
