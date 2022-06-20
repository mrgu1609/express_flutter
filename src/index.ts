import config from './config';
import Server from './server/server';

const server = new Server({ port: config.port });

server.listen();
