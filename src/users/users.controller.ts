import { Controller, Post, Body,Put,Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto, UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return {
      message: 'User created successfully',
      user,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.usersService.update(parseInt(id), dto);
    return {
      message: 'User updated successfully',
      user,
    };
  }

  @Put(':id/change-password')
  async changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDto) {

    const user = await this.usersService.changePassword(parseInt(id), dto);
    return {
      message: 'Password changed successfully',
      user,
    };
  }
}


