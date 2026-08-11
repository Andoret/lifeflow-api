import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateScheduleActivityDto } from './dto/create-schedule-activity.dto';
import { UpdateScheduleActivityDto } from './dto/update-schedule-activity.dto';

function parseDateOnly(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

@Injectable()
export class ScheduleActivitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserAndDate(userId: number, activityDate: string) {
    try {
      return await this.prisma.scheduleActivities.findMany({
        where: {
          userId,
          activityDate: parseDateOnly(activityDate),
        },
        orderBy: [{ hour: 'asc' }, { scheduleActivityId: 'asc' }],
      });
    } catch {
      throw new InternalServerErrorException(
        'Failed to find schedule activities',
      );
    }
  }

  async findByUserAndRange(userId: number, from: string, to: string) {
    try {
      return await this.prisma.scheduleActivities.findMany({
        where: {
          userId,
          activityDate: {
            gte: parseDateOnly(from),
            lte: parseDateOnly(to),
          },
        },
        orderBy: [{ activityDate: 'asc' }, { hour: 'asc' }],
      });
    } catch {
      throw new InternalServerErrorException(
        'Failed to find schedule activities',
      );
    }
  }

  async findByIdAndUser(scheduleActivityId: number, userId: number) {
    try {
      const activity = await this.prisma.scheduleActivities.findFirst({
        where: { scheduleActivityId, userId },
      });
      if (!activity) {
        throw new NotFoundException('Schedule activity not found');
      }
      return activity;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to find schedule activity',
      );
    }
  }

  async create(userId: number, data: CreateScheduleActivityDto) {
    try {
      return await this.prisma.scheduleActivities.create({
        data: {
          userId,
          title: data.title,
          description: data.description,
          activityDate: parseDateOnly(data.activityDate),
          hour: data.hour,
          category: data.category ?? 'GENERAL',
          priority: data.priority ?? 2,
        },
      });
    } catch {
      throw new InternalServerErrorException(
        'Failed to create schedule activity',
      );
    }
  }

  async update(
    scheduleActivityId: number,
    userId: number,
    data: UpdateScheduleActivityDto,
  ) {
    try {
      await this.findByIdAndUser(scheduleActivityId, userId);

      const updateData: {
        title?: string;
        description?: string | null;
        activityDate?: Date;
        hour?: number;
        completed?: boolean;
        category?: string;
        priority?: number;
      } = {};

      if (data.title !== undefined) {
        updateData.title = data.title;
      }
      if (data.description !== undefined) {
        updateData.description = data.description;
      }
      if (data.activityDate !== undefined) {
        updateData.activityDate = parseDateOnly(data.activityDate);
      }
      if (data.hour !== undefined) {
        updateData.hour = data.hour;
      }
      if (data.completed !== undefined) {
        updateData.completed = data.completed;
      }
      if (data.category !== undefined) {
        updateData.category = data.category;
      }
      if (data.priority !== undefined) {
        updateData.priority = data.priority;
      }

      return await this.prisma.scheduleActivities.update({
        where: { scheduleActivityId },
        data: updateData,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to update schedule activity',
      );
    }
  }

  async setCompleted(
    scheduleActivityId: number,
    userId: number,
    completed: boolean,
  ) {
    try {
      await this.findByIdAndUser(scheduleActivityId, userId);
      return await this.prisma.scheduleActivities.update({
        where: { scheduleActivityId },
        data: { completed },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to update schedule activity status',
      );
    }
  }

  async delete(scheduleActivityId: number, userId: number) {
    try {
      await this.findByIdAndUser(scheduleActivityId, userId);
      return await this.prisma.scheduleActivities.delete({
        where: { scheduleActivityId },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to delete schedule activity',
      );
    }
  }
}
