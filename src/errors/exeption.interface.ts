import { NextFunction, Request, Response } from 'express';

export interface IExseptionFilter {
    catch: (error: Error, req: Request, res: Response, next: NextFunction) => void
}