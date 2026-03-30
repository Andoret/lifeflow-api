import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail,IsNumber, IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @IsOptional()
    @IsEmail()
    email?: string;


    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @IsOptional()
    name?: string;

    @IsString()
    @MinLength(12)
    @MaxLength(30)
    @IsOptional()
    password?: string;

    @IsNumber()
    @IsOptional()
    roleId?: number;
}

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(12)
    @MaxLength(30)
    newPassword: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(12)
    @MaxLength(30)
    confirmPassword: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(12)
    @MaxLength(30)
    currentPassword: string;
}