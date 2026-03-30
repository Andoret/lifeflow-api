import { Controller, Post, Body,Put,Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { AutoRegisterDto, CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto, UpdateUserDto } from './dto/update-user.dto';

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

  @Post('/auto-register')
  async autoRegister(@Body() dto: AutoRegisterDto) {
    const user = await this.usersService.createAutoRegister(dto);
    return {

      status:true,

      message: 'User created successfully',
      user,
    };
  }

  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.usersService.update(parseInt(id), dto);
    return {
      status:true,
      message: 'User updated successfully',
      user,
    };
  }

  @Put('/change-password/:id')
  async changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDto) {

    const user = await this.usersService.changePassword(parseInt(id), dto);
    return {
      status:true,
      message: 'Password changed successfully',
      user,
    };
  }
}


