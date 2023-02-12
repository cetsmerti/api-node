import express, { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logeer/loger.interface';
import { TYPES } from '../type';
import 'reflect-metadata'
import { IUserConroller } from './users.interface';
import { HTTPError } from '../errors/http-error.class';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserServices } from './users.service';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken'
import { ConfigService } from '../config/config.service';
import { IConfigService } from '../config/config.service.interface';
import { GuadrdMiddleware } from '../common/guard.middleware';
@injectable()
export class UserController extends BaseController implements IUserConroller {
    constructor(
        @inject(TYPES.ILogger) private logerService: ILogger,
        @inject(TYPES.UserServices) private userService: UserServices,
        @inject(TYPES.ConfigService) private configService: IConfigService) {
        super(logerService)
        this.bindRoutes([
            { path: '/register', method: 'post', func: this.register, middlewares: [new ValidateMiddleware(UserRegisterDto),] },
            { path: '/login', method: 'get', func: this.login, middlewares: [new ValidateMiddleware(UserLoginDto)] },
            { path: '/info', method: 'get', func: this.info, middlewares: [new GuadrdMiddleware()] },
        ])
    }

    async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
        const result = await this.userService.validateUser(body)
        if (!result) {
            return next(new HTTPError(401, 'ошибка авторизации', 'login'));
        }
        const jwt = await this.signJWT(body.email, this.configService.get('SECRET'))
        this.ok(res, { jwt })
    }


    async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
        const result = await this.userService.createUser(body)
        if (!result) {
            return next(new HTTPError(422, 'Такой пользователь существует'))
        }
        this.ok(res, result);
    }

    async info({ user }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
        const userInfo = await this.userService.getUserInfo(user)
        this.ok(res, { email: userInfo });
    }


    private signJWT(email: string, secter: string) {
        return new Promise((res, rej) => {
            sign({
                email,
                iat: Math.floor(Date.now() / 1000)
            }, secter, {
                algorithm: "HS256"
            }, (eror, token) => {
                if (eror) {
                    rej(eror)
                }
                res(token as string)
            })
        })
    }
}