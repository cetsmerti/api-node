import { PrismaClient, UserModal } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../type';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UsersRepository implements IUsersRepository {
    constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) { }
    async create({ email, password, name }: User): Promise<UserModal> {
        return this.prismaService.client.userModal.create({
            data: {
                name,
                password,
                email
            }
        })
    }
    async find(email: string): Promise<UserModal | null> {
        return this.prismaService.client.userModal.findFirst({
            where: {
                email,
            }
        })
    }
}