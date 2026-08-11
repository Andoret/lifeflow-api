import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoriesExpensesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: number) {
    try {
      return await this.prisma.categories.findMany({
        where: { userId },
        orderBy: { name: 'asc' },
      });
    } catch {
      throw new InternalServerErrorException(
        'Failed to find categories by user id',
      );
    }
  }

  async findByIdAndUser(categoryId: number, userId: number) {
    const category = await this.prisma.categories.findFirst({
      where: { categoryId, userId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async create(userId: number, data: { name: string }) {
    try {
      return await this.prisma.categories.create({
        data: { userId, name: data.name },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Category already exists');
      }
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async update(categoryId: number, userId: number, data: { name: string }) {
    await this.findByIdAndUser(categoryId, userId);
    try {
      return await this.prisma.categories.update({
        where: { categoryId },
        data: { name: data.name },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Category already exists');
      }
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  async delete(categoryId: number, userId: number) {
    await this.findByIdAndUser(categoryId, userId);
    try {
      return await this.prisma.categories.delete({
        where: { categoryId },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new ConflictException('Category has expenses linked');
      }
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
