import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import config from './config.js';
import './src/sockets/sockets.js';
import { handleListingSocketConnection } from './src/sockets/sockets.js';
import { startRedisSubscriber } from './src/sockets/redisSubscriber.js';

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: config.FRONTEND_URL,
    methods: [`GET`, `POST`],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`${socket.id} just established connection with WebSocket`);
  handleListingSocketConnection(socket, io);
});

startRedisSubscriber();

server.listen(config.PORT, () => {
  console.log(`Server running on ${config.BASE_URL}`);
});
