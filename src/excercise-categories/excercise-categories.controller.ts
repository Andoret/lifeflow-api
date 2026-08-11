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
import { CreateExcerciseCategoryDto } from './dto/create-excercise-category.dto';
import { UpdateExcerciseCategoryDto } from './dto/update-excercise-category.dto';
import { ExcerciseCategoriesService } from './excercise-categories.service';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';

@Controller('excercise-categories')
export class ExcerciseCategoriesController {
  constructor(
    private readonly excerciseCategoriesService: ExcerciseCategoriesService,
  ) {}

  @Get()
  async findAll(@CurrentUser('userId') userId: number) {
    const categories = await this.excerciseCategoriesService.findByUserId(userId);
    return {
      status: true,
      categories,
    };
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('userId') userId: number,
  ) {
    const category = await this.excerciseCategoriesService.findById(id, userId);
    return {
      status: true,
      category,
    };
  }

  @Post()
  async create(
    @CurrentUser('userId') userId: number,
    @Body() dto: CreateExcerciseCategoryDto,
  ) {
    const category = await this.excerciseCategoriesService.create(userId, dto);
    return {
      status: true,
      message: 'Excercise category created successfully',
      category,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('userId') userId: number,
    @Body() dto: UpdateExcerciseCategoryDto,
  ) {
    const category = await this.excerciseCategoriesService.update(id, userId, dto);
    return {
      status: true,
      message: 'Excercise category updated successfully',
      category,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('userId') userId: number,
  ) {
    const category = await this.excerciseCategoriesService.delete(id, userId);
    return {
      status: true,
      message: 'Excercise category deleted successfully',
      category,
    };
  }
}
