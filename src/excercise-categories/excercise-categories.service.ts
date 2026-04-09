import { Injectable } from '@nestjs/common';
import { CreateExcerciseCategoryDto } from './dto/create-excercise-category.dto';
import { UpdateExcerciseCategoryDto } from './dto/update-excercise-category.dto';
import { ExcerciseCategoriesRepository } from './excersice-categories.repository';

@Injectable()
export class ExcerciseCategoriesService {
  constructor(
    private readonly excerciseCategoriesRepository: ExcerciseCategoriesRepository,
  ) {}

  async create(dto: CreateExcerciseCategoryDto) {
    const id = await this.excerciseCategoriesRepository.create({
      catname: dto.catname,
    });
    return { id };
  }

  async findAll() {
    return this.excerciseCategoriesRepository.findAll();
  }

  async findById(id: number) {
    return this.excerciseCategoriesRepository.findById(id);
  }

  async update(id: number, dto: UpdateExcerciseCategoryDto) {
    await this.excerciseCategoriesRepository.findById(id);
    const category = await this.excerciseCategoriesRepository.update(id, {
      catname: dto.catname,
    });
    return { id: category.exCatId };
  }

  async delete(id: number) {
    await this.excerciseCategoriesRepository.findById(id);
    const category = await this.excerciseCategoriesRepository.delete(id);
    return { id: category.exCatId };
  }
}
