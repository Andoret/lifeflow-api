import { Injectable } from '@nestjs/common';
import { CreateExcerciseCategoryDto } from './dto/create-excercise-category.dto';
import { UpdateExcerciseCategoryDto } from './dto/update-excercise-category.dto';
import { ExcerciseCategoriesRepository } from './excersice-categories.repository';

@Injectable()
export class ExcerciseCategoriesService {
  constructor(
    private readonly excerciseCategoriesRepository: ExcerciseCategoriesRepository,
  ) {}

  async create(userId: number, dto: CreateExcerciseCategoryDto) {
    return this.excerciseCategoriesRepository.create({
      userId,
      catname: dto.catname,
    });
  }

  async findByUserId(userId: number) {
    return this.excerciseCategoriesRepository.findByUserId(userId);
  }

  async findById(id: number, userId: number) {
    return this.excerciseCategoriesRepository.findByIdAndUser(id, userId);
  }

  async update(id: number, userId: number, dto: UpdateExcerciseCategoryDto) {
    const category = await this.excerciseCategoriesRepository.update(id, userId, {
      catname: dto.catname,
    });
    return { id: category.exCatId };
  }

  async delete(id: number, userId: number) {
    const category = await this.excerciseCategoriesRepository.delete(id, userId);
    return { id: category.exCatId };
  }
}
