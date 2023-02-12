import { NextFunction, Response, Request } from 'express';

export interface IMiddlewares {
    execute: (req: Request, res: Response, next: NextFunction) => void
}