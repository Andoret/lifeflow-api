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
  async create(data: { catname: string }) {
    try {
      const category = await this.prisma.excerciseCategories.create({
        data: {
          catname: data.catname,
        },
      });
      return category.exCatId;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to create excercise category',
      );
    }
  }
  async findAll() {
    try {
      const categories = await this.prisma.excerciseCategories.findMany();
      return categories;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to find all excercise categories',
      );
    }
  }
  async findById(id: number){
    try{
      const category = await this.prisma.excerciseCategories.findUnique({
        where:{
          exCatId: id
        }
      })
      if(!category){
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
  async update(id: number, data: { catname: string }){
    try{
      const category = await this.prisma.excerciseCategories.update({
        where:{
          exCatId: id
        },
        data: {
          catname: data.catname
        }
      })
      return category;
    }catch(error){
      console.error(error);
      throw new NotFoundException('Excercise category not found');
    }
  }
  async delete(id: number){
    try{
      const category = await this.prisma.excerciseCategories.delete({
        where:{
          exCatId: id
        }
      })
      if(!category){
        throw new NotFoundException('Excercise category not found');
      }
      return category;
      }catch(error){
      console.error(error);
      throw new NotFoundException('Excercise category not found');
    } 
  }
}
