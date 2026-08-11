import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class SetExerciseWeekDayDto {
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

  @IsNumber()
  @IsOptional()
  exCatId?: number | null;
}
