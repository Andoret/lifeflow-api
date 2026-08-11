import { IsInt, Max, Min } from 'class-validator';

export class GenerateExerciseRoutineDto {
  @IsInt()
  exCatId: number;

  @IsInt()
  @Min(5)
  @Max(240)
  timeLimitMinutes: number;
}
