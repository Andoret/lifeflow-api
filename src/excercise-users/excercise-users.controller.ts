import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ExcerciseUsersService } from './excercise-users.service';
import { SetExerciseWeekDayDto } from './dto/set-exercise-week-day.dto';
import { SaveExerciseRoutineDto } from './dto/save-exercise-routine.dto';
import { GenerateExerciseRoutineDto } from './dto/generate-exercise-routine.dto';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';

@Controller('excercise-users')
export class ExcerciseUsersController {
  constructor(private readonly excerciseUsersService: ExcerciseUsersService) {}

  @Get('week-plan')
  async getWeekPlan(
    @CurrentUser('userId') userId: number,
    @Query('weekStart') weekStart: string,
  ) {
    return this.excerciseUsersService.getWeekPlan(userId, weekStart);
  }

  @Put('week-plan/day')
  async setDayPlan(
    @CurrentUser('userId') userId: number,
    @Body() dto: SetExerciseWeekDayDto,
  ) {
    return this.excerciseUsersService.setDayPlan(userId, dto);
  }

  @Post('week-plan/routine')
  async saveRoutine(
    @CurrentUser('userId') userId: number,
    @Body() dto: SaveExerciseRoutineDto,
  ) {
    return this.excerciseUsersService.saveRoutine(userId, dto);
  }

  @Post('week-plan/generate')
  async generate(
    @CurrentUser('userId') userId: number,
    @Body() dto: GenerateExerciseRoutineDto,
  ) {
    return this.excerciseUsersService.generate(userId, dto);
  }
}
