import { Controller, Post, Body, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { AutoRegisterDto, CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../authentication/decorators/public.decorator';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return {
      status:true,
      message: 'User created successfully',
      user,
    };
  }

  @Public()
  @Post('/auto-register')
  async autoRegister(@Body() dto: AutoRegisterDto) {
    const user = await this.usersService.createAutoRegister(dto);
    return {

      status:true,

      message: 'User created successfully',
      user,
    };
  }

  @Put('/me')
  async updateMe(@CurrentUser('userId') userId: number, @Body() dto: UpdateUserDto) {
    const user = await this.usersService.update(userId, dto);
    return {
      status:true,
      message: 'User updated successfully',
      user,
    };
  }

  @Put('/me/password')
  async changeMyPassword(@CurrentUser('userId') userId: number, @Body() dto: ChangePasswordDto) {
    const user = await this.usersService.changePassword(userId, dto);
    return {
      status:true,
      message: 'Password changed successfully',
      user,
    };
  }
}
