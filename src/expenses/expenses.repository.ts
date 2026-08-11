import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ExpenseQueryDto } from './dto/expense-query.dto';

function parseDateOnly(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function endOfDay(dateStr: string): Date {
  const start = parseDateOnly(dateStr);
  return new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
}

@Injectable()
export class ExpensesRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(userId: number, query: ExpenseQueryDto): Prisma.ExpensesWhereInput {
    const where: Prisma.ExpensesWhereInput = { userId };
    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }
    if (query.from || query.to) {
      where.date = {
        ...(query.from ? { gte: parseDateOnly(query.from) } : {}),
        ...(query.to ? { lte: endOfDay(query.to) } : {}),
      };
    }
    return where;
  }

  async findByUser(userId: number, query: ExpenseQueryDto) {
    try {
      return await this.prisma.expenses.findMany({
        where: this.buildWhere(userId, query),
        include: { category: true },
        orderBy: { date: 'desc' },
      });
    } catch {
      throw new InternalServerErrorException('Failed to find expenses');
    }
  }

  async findByIdAndUser(expenseId: number, userId: number) {
    const expense = await this.prisma.expenses.findFirst({
      where: { expenseId, userId },
      include: { category: true },
    });
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  async findCategoryForUser(categoryId: number, userId: number) {
    const category = await this.prisma.categories.findFirst({
      where: { categoryId, userId },
    });
    if (!category) {
      throw new NotFoundException('Expense category not found');
    }
    return category;
  }

  async create(
    userId: number,
    data: { categoryId: number; description: string; price: number; date?: string },
  ) {
    try {
      return await this.prisma.expenses.create({
        data: {
          userId,
          categoryId: data.categoryId,
          description: data.description,
          price: data.price,
          ...(data.date ? { date: parseDateOnly(data.date) } : {}),
        },
        include: { category: true },
      });
    } catch {
      throw new InternalServerErrorException('Failed to create expense');
    }
  }

  async update(
    expenseId: number,
    userId: number,
    data: { categoryId?: number; description?: string; price?: number; date?: string },
  ) {
    await this.findByIdAndUser(expenseId, userId);
    try {
      return await this.prisma.expenses.update({
        where: { expenseId },
        data: {
          ...(data.categoryId !== undefined ? { categoryId: data.categoryId } : {}),
          ...(data.description !== undefined ? { description: data.description } : {}),
          ...(data.price !== undefined ? { price: data.price } : {}),
          ...(data.date !== undefined ? { date: parseDateOnly(data.date) } : {}),
        },
        include: { category: true },
      });
    } catch {
      throw new InternalServerErrorException('Failed to update expense');
    }
  }

  async delete(expenseId: number, userId: number) {
    await this.findByIdAndUser(expenseId, userId);
    try {
      return await this.prisma.expenses.delete({ where: { expenseId } });
    } catch {
      throw new InternalServerErrorException('Failed to delete expense');
    }
  }
}
