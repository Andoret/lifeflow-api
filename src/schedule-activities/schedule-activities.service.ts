import { Injectable } from '@nestjs/common';
import { ScheduleActivitiesRepository } from './schedule-activities.repository';
import { CreateScheduleActivityDto } from './dto/create-schedule-activity.dto';
import { UpdateScheduleActivityDto } from './dto/update-schedule-activity.dto';

@Injectable()
export class ScheduleActivitiesService {
  constructor(
    private readonly scheduleActivitiesRepository: ScheduleActivitiesRepository,
  ) {}

  findByUserAndDate(userId: number, date: string) {
    return this.scheduleActivitiesRepository.findByUserAndDate(userId, date);
  }

  findByUserAndRange(userId: number, from: string, to: string) {
    return this.scheduleActivitiesRepository.findByUserAndRange(userId, from, to);
  }

  create(userId: number, data: CreateScheduleActivityDto) {
    return this.scheduleActivitiesRepository.create(userId, data);
  }

  update(scheduleActivityId: number, userId: number, data: UpdateScheduleActivityDto) {
    return this.scheduleActivitiesRepository.update(scheduleActivityId, userId, data);
  }

  markCompleted(
    scheduleActivityId: number,
    userId: number,
    completed = true,
  ) {
    return this.scheduleActivitiesRepository.setCompleted(
      scheduleActivityId,
      userId,
      completed,
    );
  }

  delete(scheduleActivityId: number, userId: number) {
    return this.scheduleActivitiesRepository.delete(scheduleActivityId, userId);
  }
}
