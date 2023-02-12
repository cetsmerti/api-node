import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
    @IsEmail({}, { message: 'Не верно указан mail' })
    email: string;

    @IsString({ message: 'Не верно указан Пороль' })
    password: string;

    @IsString({ message: 'Не верно указан Имя' })
    name: string;
}