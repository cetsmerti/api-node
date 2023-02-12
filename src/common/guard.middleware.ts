import { IMiddlewares } from './middleware';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';


export class GuadrdMiddleware implements IMiddlewares {

    execute(req: Request, res: Response, next: NextFunction) {
        if (req.user) {
            return next()
        } else {
            res.status(401).send({ error: 'Вы не авторизованы' });
        }

    }
}