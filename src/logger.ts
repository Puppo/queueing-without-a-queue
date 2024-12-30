import * as Pino from 'pino';

const logger = Pino.pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

export default logger;