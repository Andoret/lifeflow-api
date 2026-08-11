import { Module } from '@nestjs/common';
import { ScheduleActivitiesController } from './schedule-activities.controller';
import { ScheduleActivitiesService } from './schedule-activities.service';
import { ScheduleActivitiesRepository } from './schedule-activities.repository';

@Module({
  controllers: [ScheduleActivitiesController],
  providers: [ScheduleActivitiesService, ScheduleActivitiesRepository],
})
export class ScheduleActivitiesModule {}
