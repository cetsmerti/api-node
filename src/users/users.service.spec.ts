import 'reflect-metadata'
import { UserModal } from '@prisma/client'
import { Container } from 'inversify'
import { IConfigService } from '../config/config.service.interface'
import { TYPES } from '../type'
import { User } from './user.entity'
import { IUsersRepository } from './users.repository.interface'
import { UserServices } from './users.service'
import { IUseService } from './users.service.interface'

const ConfigServiceMock: IConfigService = {
    get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
    find: jest.fn(),
    create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUseService;

beforeAll(() => {
    container.bind<IUseService>(TYPES.UserServices).to(UserServices);
    container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
    container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

    configService = container.get<IConfigService>(TYPES.ConfigService);
    usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
    usersService = container.get<IUseService>(TYPES.UserServices);
});

let createdUser: UserModal | null;
let validUser: UserModal | null;

describe('User Service', () => {
    it('createUser', async () => {
        configService.get = jest.fn().mockReturnValueOnce('1');
        usersRepository.create = jest.fn().mockImplementationOnce(
            (user: User): UserModal => ({
                name: user.name,
                email: user.email,
                password: user.password,
                id: 1,
            }),
        );
        createdUser = await usersService.createUser({
            email: 'a@a.ru',
            name: 'Антон',
            password: '1',
        });
        expect(createdUser?.id).toEqual(1);
        expect(createdUser?.password).not.toEqual('1');
    });

});