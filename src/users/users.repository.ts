
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    email: string;
    password: string;
    roleId: number;
    active: boolean;
    deletedBy?: number | null;
    updatedBy?: number | null;
  }) {
    try {
    const user = await this.prisma.users.create({ data });
    return user.userId;
    } catch (error) {
      console.error(error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException('roleId does not exist');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async update(id:number,data: {
    email?: string;
    password?: string;
    roleId?: number;
  }) {
    try {
      const user = await this.prisma.users.update(
        { where: { userId: id }, data});
      return user.userId;
    }catch(error){
      console.error(error);
      throw new InternalServerErrorException('Failed to update user');
    }
  }


  async delete (id:number) {
    try{
      const user = await this.prisma.users.delete({
        where: { userId: id },
        select: {
          userId: true,
        },
      });
      return user.userId;
    }catch(error){
      console.error(error);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  async findByEmail(email: string) {
    try {
      return this.prisma.users.findUnique({
        where: { email },
        select: {
          userId: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to find user by email');
    }
  }

  async findByIdWithPassword(id: number) {
    try {
      return this.prisma.users.findUnique({
        where: { userId: id },
        select: {
          userId: true,
          password: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to find user by id with password');
    }
  }
  
  async findById(id: number) {
    try {
      return this.prisma.users.findUnique({
        where: { userId: id },
        select: {
          userId: true,
          email: true,
          roleId: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to find user by id');
    }
  }

  async changePassword(id:number,password:string){
    try{
      const user = await this.prisma.users.update({
        where: { userId: id },
        data: { password: password },
        select: {
          userId: true,
        },
      });
      return user.userId;
    }
    catch(error){
      console.error(error);
      throw new InternalServerErrorException('Failed to change password');
    }
  }
}
