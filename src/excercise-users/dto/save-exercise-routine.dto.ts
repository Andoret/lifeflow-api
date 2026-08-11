import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class SaveExerciseRoutineDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'weekStart must be in YYYY-MM-DD format',
  })
  weekStart: string;

  @IsInt()
  @Min(1)
  @Max(7)
  dayOfWeek: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  reqResponse: string;

  @IsInt()
  @Min(5)
  @Max(240)
  @IsOptional()
  timeLimitMinutes?: number;
}
