import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv'
import { inject, injectable } from 'inversify';
import { TYPES } from '../type';
import { ILogger } from '../logeer/loger.interface';

@injectable()
export class ConfigService implements IConfigService {

    private config: DotenvParseOutput
    constructor(@inject(TYPES.ILogger) private logerService: ILogger) {
        const result: DotenvConfigOutput = config();
        if (result.error) {
            this.logerService.error('Не удалось прочитать файл .env или отсутсвует ')
        } else {
            this.logerService.log('Конфигурация env загружена')
            this.config = result.parsed as DotenvParseOutput;
        }
    }
    get(key: string) {
        return this.config[key]
    }
}