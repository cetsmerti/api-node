import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { LoggerService } from '../logeer/loger';
import { ILogger } from '../logeer/loger.interface';
import { TYPES } from '../type';
import { IExseptionFilter } from './exeption.interface';
import { HTTPError } from './http-error.class';
import 'reflect-metadata'

@injectable()
export class ExeptionFilter implements IExseptionFilter {
    constructor(@inject(TYPES.ILogger) private loger: ILogger) {
    }
    catch(error: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (error instanceof HTTPError) {
            this.loger.error(`${error.context} Error ${error.statusCode}| ${error.message}`)
            res.status(error.statusCode).send({ err: error.message })
        } else {
            this.loger.error(`${error.message}`)
            res.status(500).send({ err: error.message })
        }

    }

}