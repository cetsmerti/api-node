import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import 'reflect-metadata'
import { inject, injectable } from 'inversify';
import { IUseService } from './users.service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { TYPES } from '../type';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModal } from '@prisma/client';
import { hash, hashSync } from 'bcryptjs';

@injectable()
export class UserServices implements IUseService {
    constructor(@inject(TYPES.ConfigService) private ConfigService: IConfigService,
        @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository) { }
    async createUser({ email, name, password }: UserRegisterDto): Promise<UserModal | null> {
        const newUser = new User(email, name)
        const solt = this.ConfigService.get('SALT')
        await newUser.serPassword(password, Number(solt))
        const existedUser = await this.usersRepository.find(email)
        if (existedUser) {
            return null
        } else {
            return this.usersRepository.create(newUser)
        }
    }
    async validateUser({ email, password }: any) {
        const existedUser = await this.usersRepository.find(email)
        if (!existedUser) {
            return false
        }
        const newUser = new User(existedUser.email, existedUser.name, existedUser.password)
        return newUser.comparePass(password)

    }

    async getUserInfo(email: string) {
        return await this.usersRepository.find(email)

    }
} 