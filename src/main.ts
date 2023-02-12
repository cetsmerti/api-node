import { Container, ContainerModule, interfaces } from 'inversify'
import { App } from './app'
import { ConfigService } from './config/config.service'
import { IConfigService } from './config/config.service.interface'
import { PrismaService } from './database/prisma.service'
import { ExeptionFilter } from './errors/exeption.filter'
import { IExseptionFilter } from './errors/exeption.interface'
import { LoggerService } from './logeer/loger'
import { ILogger } from './logeer/loger.interface'
import { TYPES } from './type'
import { UserController } from './users/users.controller'
import { IUserConroller } from './users/users.interface'
import { UsersRepository } from './users/users.repository'
import { IUsersRepository } from './users/users.repository.interface'
import { UserServices } from './users/users.service'
import { IUseService } from './users/users.service.interface'

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService)
    bind<IExseptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
    bind<IUserConroller>(TYPES.UserController).to(UserController)
    bind<App>(TYPES.Application).to(App)
    bind<IUseService>(TYPES.UserServices).to(UserServices)
    bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope()
    bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
})

export function boostrap() {
    const appContainer = new Container()
    appContainer.load(appBindings)
    const app = appContainer.get<App>(TYPES.Application)
    app.init()
    return { app, appContainer }
}


export const { app, appContainer } = boostrap()