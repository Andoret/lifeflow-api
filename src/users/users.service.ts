import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, AutoRegisterDto } from './dto/create-user.dto';
import { ChangePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository:UsersRepository){}

  async create(dto:CreateUserDto){
    const existingUser = await this.usersRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepository.create({...dto, password: hashedPassword, active: true, deletedBy: null, updatedBy: null});
    return {
      id: user,
    };
  }
  async createAutoRegister(dto: AutoRegisterDto){
    const existingUser = await this.usersRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepository.createAutoRegister({...dto,password:hashedPassword});
    return {
      id: user,
    };
  }

  async update(id:number,dto:UpdateUserDto){
    const existingUser = await this.usersRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    
    const user = await this.usersRepository.update(id,dto);
    return {
      id: user,
    };
  }

  async delete(id:number){
    const existingUser = await this.usersRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    const user = await this.usersRepository.delete(id);
    return {
      id: user,
    };
  }

  async changePassword(id:number,dto:ChangePasswordDto){
    const existingUser = await this.usersRepository.findByIdWithPassword(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    
    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const validateCurrentPassword = await bcrypt.compare(dto.currentPassword, existingUser.password);

    if (!validateCurrentPassword) {
      throw new BadRequestException('Invalid password');
    }

    const validatePassword = await bcrypt.compare(dto.newPassword, existingUser.password);
    if (validatePassword) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    const user = await this.usersRepository.changePassword(id,hashedPassword);
    return {
      id: user,
    };
  }
}
