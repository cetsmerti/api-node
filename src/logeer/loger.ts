import { injectable } from 'inversify';
import { Logger } from 'tslog'
import { ILogObj } from 'tslog/dist/types/interfaces';
import { ILogger } from './loger.interface';
import 'reflect-metadata'

@injectable()
export class LoggerService implements ILogger {
    public logger: Logger<ILogObj>;
    constructor() {
        this.logger = new Logger({
            prettyLogTemplate: ' '
        })
    }
    log(...args: unknown[]) {
        this.logger.info(...args)
    }
    error(...args: unknown[]) {
        this.logger.error(...args)
    }
    warn(...args: unknown[]) {
        this.logger.warn(...args)
    }
}