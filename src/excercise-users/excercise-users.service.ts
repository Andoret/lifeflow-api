import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExcerciseUsersRepository } from './excercise-users.repository';
import { SetExerciseWeekDayDto } from './dto/set-exercise-week-day.dto';
import { SaveExerciseRoutineDto } from './dto/save-exercise-routine.dto';
import { GenerateExerciseRoutineDto } from './dto/generate-exercise-routine.dto';

@Injectable()
export class ExcerciseUsersService {
  constructor(
    private readonly excerciseUsersRepository: ExcerciseUsersRepository,
  ) {}

  async getWeekPlan(userId: number, weekStart: string) {
    try {
      const plan = await this.excerciseUsersRepository.findWeekPlan(
        userId,
        weekStart,
      );
      return { status: true, plan };
    } catch {
      throw new HttpException(
        'Failed to find week exercise plan',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async setDayPlan(userId: number, dto: SetExerciseWeekDayDto) {
    const day = await this.excerciseUsersRepository.setDayPlan(userId, dto);
    return {
      status: true,
      message: 'Day plan updated',
      data: day,
    };
  }

  async saveRoutine(userId: number, dto: SaveExerciseRoutineDto) {
    try {
      const day = await this.excerciseUsersRepository.saveRoutine(userId, dto);
      return {
        status: true,
        message: 'Routine saved',
        data: day,
      };
    } catch {
      throw new HttpException(
        'Failed to save routine',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generate(userId: number, dto: GenerateExerciseRoutineDto) {
    const category = await this.excerciseUsersRepository.findCategoryForUser(
      dto.exCatId,
      userId,
    );

    // TODO(user): reemplazar este contenido de ejemplo por una llamada real a la
    // API de Anthropic (Claude) pidiendo 5 ejercicios de la categoría `category.catname`
    // que quepan en `dto.timeLimitMinutes` minutos. Ver docs/HOW_IT_WORKS.md.
    const content = [
      `Rutina de "${category.catname}" (placeholder, sin generar por IA todavía).`,
      `Tiempo disponible: ${dto.timeLimitMinutes} minutos.`,
      '1. Conecta aquí tu propia llamada a la API de Anthropic para reemplazar este texto.',
    ].join('\n');

    return {
      status: true,
      content,
      timeLimitMinutes: dto.timeLimitMinutes,
    };
  }
}
