import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseQueryDto } from './dto/expense-query.dto';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  // Debe declararse antes de ":expenseId" para que Nest no lo confunda con un id.
  @Get('stats/summary')
  async getStatsSummary(
    @CurrentUser('userId') userId: number,
    @Query() query: ExpenseQueryDto,
  ) {
    const stats = await this.expensesService.getStatsSummary(userId, query);
    return { status: true, stats };
  }

  @Get()
  async findAll(
    @CurrentUser('userId') userId: number,
    @Query() query: ExpenseQueryDto,
  ) {
    const expenses = await this.expensesService.findByUser(userId, query);
    return { status: true, expenses };
  }

  @Get(':expenseId')
  async findById(
    @Param('expenseId', ParseIntPipe) expenseId: number,
    @CurrentUser('userId') userId: number,
  ) {
    const expense = await this.expensesService.findById(expenseId, userId);
    return { status: true, expense };
  }

  @Post()
  async create(
    @CurrentUser('userId') userId: number,
    @Body() dto: CreateExpenseDto,
  ) {
    const expense = await this.expensesService.create(userId, dto);
    return { status: true, message: 'Expense created successfully', expense };
  }

  @Put(':expenseId')
  async update(
    @Param('expenseId', ParseIntPipe) expenseId: number,
    @CurrentUser('userId') userId: number,
    @Body() dto: UpdateExpenseDto,
  ) {
    const expense = await this.expensesService.update(expenseId, userId, dto);
    return { status: true, message: 'Expense updated successfully', expense };
  }

  @Delete(':expenseId')
  async delete(
    @Param('expenseId', ParseIntPipe) expenseId: number,
    @CurrentUser('userId') userId: number,
  ) {
    const expense = await this.expensesService.delete(expenseId, userId);
    return { status: true, message: 'Expense deleted successfully', expense };
  }
}
