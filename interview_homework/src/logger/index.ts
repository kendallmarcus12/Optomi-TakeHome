import winston from 'winston';

export class Logger {
  private winston: any;
  requestId: string = '';
  clientId: string = '';

  constructor() {
    this.winston = winston.createLogger({
      level: 'info',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [new winston.transports.Console()],
    });
  }

  setClientId(clientId: string){
    this.clientId = clientId;
  }

  setRequestId(requestId: string) {
    this.requestId = requestId;
  }

  private log(level: string, message: string, meta?: object) {
    this.winston.log(level, message, { ...meta, requestId: this.requestId, clientId: this.clientId });
  }

  info(message: string, meta?: object) {
    this.log('info', message, meta);
  }

  error(message: string, meta?: object) {
    this.log('error', message, meta);
  }

  warn(message: string, meta?: object) {
    this.log('warn', message, meta);
  }
}
