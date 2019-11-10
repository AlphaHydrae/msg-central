const chalk = require('chalk');
const express = require('express');
const { getLogger } = require('log4js');

const { path, port } = require('./config');

const app = express();

const logger = getLogger('asap');
logger.level = 'TRACE';

app.use(express.static(path('build')));

const server = app.listen(port);

server.on('listening', () => logger.info(`Listening on port ${port}`));

server.on('error', err => {
  if (err.syscall !== 'listen') {
    throw err;
  }

  switch (err.code) {
    case 'EACCES':
      logger.fatal(chalk.red(`Port ${port} requires elevated privileges`));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.fatal(chalk.red(`Port ${port} is already in use`));
      process.exit(1);
      break;
    default:
      throw err;
  }
});