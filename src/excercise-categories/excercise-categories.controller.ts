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

@Controller('excercise-categories')
export class ExcerciseCategoriesController {
  constructor(
    private readonly excerciseCategoriesService: ExcerciseCategoriesService,
  ) {}

  @Get()
  async findAll() {
    const categories = await this.excerciseCategoriesService.findAll();
    return {
      status: true,
      categories,
    };
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const category = await this.excerciseCategoriesService.findById(id);
    return {
      status: true,
      category,
    };
  }

  @Post()
  async create(@Body() dto: CreateExcerciseCategoryDto) {
    const category = await this.excerciseCategoriesService.create(dto);
    return {
      status: true,
      message: 'Excercise category created successfully',
      category,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExcerciseCategoryDto,
  ) {
    const category = await this.excerciseCategoriesService.update(id, dto);
    return {
      status: true,
      message: 'Excercise category updated successfully',
      category,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const category = await this.excerciseCategoriesService.delete(id);
    return {
      status: true,
      message: 'Excercise category deleted successfully',
      category,
    };
  }
}
