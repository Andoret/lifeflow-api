import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, } from "class-validator";

export class LoginDto {
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
}