import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesExpensesService } from './categories-expenses.service';
import { CreateCategoryExpenseDto } from './dto/create-category-expense.dto';
import { UpdateCategoryExpenseDto } from './dto/update-category-expense.dto';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';

@Controller('categories-expenses')
export class CategoriesExpensesController {
  constructor(
    private readonly categoriesExpensesService: CategoriesExpensesService,
  ) {}

  @Get()
  async findByUserId(@CurrentUser('userId') userId: number) {
    return this.categoriesExpensesService.findByUserId(userId);
  }

  @Post()
  async create(
    @CurrentUser('userId') userId: number,
    @Body() dto: CreateCategoryExpenseDto,
  ) {
    return this.categoriesExpensesService.create(userId, dto);
  }

  @Put(':categoryId')
  async update(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @CurrentUser('userId') userId: number,
    @Body() dto: UpdateCategoryExpenseDto,
  ) {
    return this.categoriesExpensesService.update(categoryId, userId, dto);
  }

  @Delete(':categoryId')
  async delete(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @CurrentUser('userId') userId: number,
  ) {
    return this.categoriesExpensesService.delete(categoryId, userId);
  }
}
