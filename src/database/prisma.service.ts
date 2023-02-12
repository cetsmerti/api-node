import { PrismaClient, UserModal } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logeer/loger.interface';
import { TYPES } from '../type';

@injectable()
export class PrismaService {
    client: PrismaClient
    constructor(@inject(TYPES.ILogger) private logerService: ILogger) {
        this.client = new PrismaClient()
    }

    async connect() {
        try {
            this.logerService.log('Успешно подключена базу данных')
            await this.client.$connect();
        } catch (e) {
            if (e instanceof Error) {
                this.logerService.error('Ошибка к подключение баззе данных' + e.message)
            }
        }
    }
    async disconnect() {
        await this.client.$disconnect();
    }
}