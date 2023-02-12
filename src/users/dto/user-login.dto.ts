import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
    @IsEmail({}, { message: 'Не верно указан mail' })
    email: string;
    @IsString({ message: 'Не верно указан Имя' })
    password: string;
}