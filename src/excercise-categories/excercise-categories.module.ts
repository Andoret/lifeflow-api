import { Module } from '@nestjs/common';
import { ExcerciseCategoriesController } from './excercise-categories.controller';
import { ExcerciseCategoriesService } from './excercise-categories.service';
import { ExcerciseCategoriesRepository } from './excersice-categories.repository';

@Module({
  controllers: [ExcerciseCategoriesController],
  providers: [ExcerciseCategoriesService, ExcerciseCategoriesRepository]
})
export class ExcerciseCategoriesModule {}
