import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail,IsNumber } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(12)
    @MaxLength(30)
    password: string;

    @IsNumber()
    @IsNotEmpty()
    roleId: number;
}