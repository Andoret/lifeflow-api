import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ExcerciseCategoriesRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: { userId: number; catname: string }) {
    try {
      const category = await this.prisma.excerciseCategories.create({
        data: {
          userId: data.userId,
          catname: data.catname,
        },
      });
      return category;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to create excercise category',
      );
    }
  }

  async findByUserId(userId: number) {
    try {
      return await this.prisma.excerciseCategories.findMany({
        where: { userId },
        orderBy: { catname: 'asc' },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to find excercise categories by user',
      );
    }
  }

  async findByIdAndUser(id: number, userId: number) {
    try {
      const category = await this.prisma.excerciseCategories.findFirst({
        where: { exCatId: id, userId },
      });
      if (!category) {
        throw new NotFoundException('Excercise category not found');
      }
      return category;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to find excercise category ',
      );
    }
  }

  async update(id: number, userId: number, data: { catname: string }) {
    await this.findByIdAndUser(id, userId);
    try {
      const category = await this.prisma.excerciseCategories.update({
        where: { exCatId: id },
        data: {
          catname: data.catname,
        },
      });
      return category;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to update excercise category',
      );
    }
  }

  async delete(id: number, userId: number) {
    await this.findByIdAndUser(id, userId);
    try {
      const category = await this.prisma.excerciseCategories.delete({
        where: { exCatId: id },
      });
      return category;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to delete excercise category',
      );
    }
  }
}
