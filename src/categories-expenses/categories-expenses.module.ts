import { Module } from '@nestjs/common';
import { CategoriesExpensesController } from './categories-expenses.controller';
import { CategoriesExpensesService } from './categories-expenses.service';
import { CategoriesExpensesRepository } from './categories-expenses.repository';
@Module({
  controllers: [CategoriesExpensesController],
  providers: [CategoriesExpensesService, CategoriesExpensesRepository]
})
export class CategoriesExpensesModule {}
