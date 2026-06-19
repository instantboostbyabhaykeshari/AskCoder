const http = require('http');
const debug = require('debug')('backend:server');

const app = require('./app');
const portUtils = require('./src/config/port');

const PORT = portUtils.normalizePort(process.env.PORT || '5000');
app.set('port', PORT);

const server = http.createServer(app);

const onListening = () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;

  debug(`Server running on ${bind}, http://localhost:${address.port}`);
  console.log(`Server running on ${bind}, http://localhost:${address.port}`);
};

server.listen(PORT);
server.on('error', portUtils.onError);
server.on('listening', onListening);
