import { Injectable } from '@nestjs/common';
import { ExpensesRepository } from './expenses.repository';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseQueryDto } from './dto/expense-query.dto';
import { buildExpenseStats } from './expenses.stats';

@Injectable()
export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  findByUser(userId: number, query: ExpenseQueryDto) {
    return this.expensesRepository.findByUser(userId, query);
  }

  async getStatsSummary(userId: number, query: ExpenseQueryDto) {
    const expenses = await this.expensesRepository.findByUser(userId, query);
    return buildExpenseStats(expenses);
  }

  findById(expenseId: number, userId: number) {
    return this.expensesRepository.findByIdAndUser(expenseId, userId);
  }

  async create(userId: number, dto: CreateExpenseDto) {
    await this.expensesRepository.findCategoryForUser(dto.categoryId, userId);
    return this.expensesRepository.create(userId, dto);
  }

  async update(expenseId: number, userId: number, dto: UpdateExpenseDto) {
    if (dto.categoryId !== undefined) {
      await this.expensesRepository.findCategoryForUser(dto.categoryId, userId);
    }
    return this.expensesRepository.update(expenseId, userId, dto);
  }

  delete(expenseId: number, userId: number) {
    return this.expensesRepository.delete(expenseId, userId);
  }
}
