import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

function parseDateOnly(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

@Injectable()
export class ExcerciseUsersRepository {
  constructor(private prisma: PrismaService) {}

  async findWeekPlan(userId: number, weekStart: string) {
    try {
      return await this.prisma.exerciseWeekDay.findMany({
        where: {
          userId,
          weekStart: parseDateOnly(weekStart),
        },
        include: { exCat: true },
        orderBy: { dayOfWeek: 'asc' },
      });
    } catch {
      throw new InternalServerErrorException('Failed to find week exercise plan');
    }
  }

  async findCategoryForUser(exCatId: number, userId: number) {
    const category = await this.prisma.excerciseCategories.findFirst({
      where: { exCatId, userId },
    });
    if (!category) {
      throw new NotFoundException('Excercise category not found');
    }
    return category;
  }

  async setDayPlan(
    userId: number,
    data: {
      weekStart: string;
      dayOfWeek: number;
      exCatId?: number | null;
    },
  ) {
    if (data.exCatId != null) {
      await this.findCategoryForUser(data.exCatId, userId);
    }

    const weekStartDate = parseDateOnly(data.weekStart);

    try {
      return await this.prisma.exerciseWeekDay.upsert({
        where: {
          userId_weekStart_dayOfWeek: {
            userId,
            weekStart: weekStartDate,
            dayOfWeek: data.dayOfWeek,
          },
        },
        create: {
          userId,
          weekStart: weekStartDate,
          dayOfWeek: data.dayOfWeek,
          exCatId: data.exCatId ?? null,
          reqResponse: null,
        },
        update: {
          exCatId: data.exCatId ?? null,
          ...(data.exCatId == null ? { reqResponse: null, timeLimitMinutes: null } : {}),
        },
        include: { exCat: true },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to set day exercise plan');
    }
  }

  async saveRoutine(
    userId: number,
    data: {
      weekStart: string;
      dayOfWeek: number;
      reqResponse: string;
      timeLimitMinutes?: number;
    },
  ) {
    const weekStartDate = parseDateOnly(data.weekStart);

    try {
      return await this.prisma.exerciseWeekDay.upsert({
        where: {
          userId_weekStart_dayOfWeek: {
            userId,
            weekStart: weekStartDate,
            dayOfWeek: data.dayOfWeek,
          },
        },
        create: {
          userId,
          weekStart: weekStartDate,
          dayOfWeek: data.dayOfWeek,
          reqResponse: data.reqResponse,
          timeLimitMinutes: data.timeLimitMinutes ?? null,
        },
        update: {
          reqResponse: data.reqResponse,
          timeLimitMinutes: data.timeLimitMinutes ?? null,
          dateUsing: new Date(),
        },
        include: { exCat: true },
      });
    } catch {
      throw new InternalServerErrorException('Failed to save exercise routine');
    }
  }
}
