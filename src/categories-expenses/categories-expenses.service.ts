import { Injectable } from '@nestjs/common';
import { CategoriesExpensesRepository } from './categories-expenses.repository';
import { CreateCategoryExpenseDto } from './dto/create-category-expense.dto';
import { UpdateCategoryExpenseDto } from './dto/update-category-expense.dto';

@Injectable()
export class CategoriesExpensesService {
  constructor(
    private readonly categoriesExpensesRepository: CategoriesExpensesRepository,
  ) {}

  findByUserId(userId: number) {
    return this.categoriesExpensesRepository.findByUserId(userId);
  }

  create(userId: number, dto: CreateCategoryExpenseDto) {
    return this.categoriesExpensesRepository.create(userId, dto);
  }

  update(categoryId: number, userId: number, dto: UpdateCategoryExpenseDto) {
    return this.categoriesExpensesRepository.update(categoryId, userId, dto);
  }

  delete(categoryId: number, userId: number) {
    return this.categoriesExpensesRepository.delete(categoryId, userId);
  }
}
