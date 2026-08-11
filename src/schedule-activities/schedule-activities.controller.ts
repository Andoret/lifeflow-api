import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ScheduleActivitiesService } from './schedule-activities.service';
import { CreateScheduleActivityDto } from './dto/create-schedule-activity.dto';
import { UpdateScheduleActivityDto } from './dto/update-schedule-activity.dto';
import { MarkScheduleActivityDto } from './dto/mark-schedule-activity.dto';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';

@Controller('schedule-activities')
export class ScheduleActivitiesController {
  constructor(
    private readonly scheduleActivitiesService: ScheduleActivitiesService,
  ) {}

  @Get()
  findActivities(
    @CurrentUser('userId') userId: number,
    @Query('date') date?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    if (date) {
      return this.scheduleActivitiesService.findByUserAndDate(userId, date);
    }
    if (from && to) {
      return this.scheduleActivitiesService.findByUserAndRange(userId, from, to);
    }
    throw new BadRequestException('Provide either "date" or both "from" and "to"');
  }

  @Post()
  create(
    @CurrentUser('userId') userId: number,
    @Body() data: CreateScheduleActivityDto,
  ) {
    return this.scheduleActivitiesService.create(userId, data);
  }

  @Put(':scheduleActivityId')
  update(
    @Param('scheduleActivityId', ParseIntPipe) scheduleActivityId: number,
    @CurrentUser('userId') userId: number,
    @Body() data: UpdateScheduleActivityDto,
  ) {
    return this.scheduleActivitiesService.update(scheduleActivityId, userId, data);
  }

  @Patch(':scheduleActivityId/complete')
  markCompleted(
    @Param('scheduleActivityId', ParseIntPipe) scheduleActivityId: number,
    @CurrentUser('userId') userId: number,
    @Body() data: MarkScheduleActivityDto,
  ) {
    return this.scheduleActivitiesService.markCompleted(
      scheduleActivityId,
      userId,
      data.completed ?? true,
    );
  }

  @Delete(':scheduleActivityId')
  delete(
    @Param('scheduleActivityId', ParseIntPipe) scheduleActivityId: number,
    @CurrentUser('userId') userId: number,
  ) {
    return this.scheduleActivitiesService.delete(scheduleActivityId, userId);
  }
}
