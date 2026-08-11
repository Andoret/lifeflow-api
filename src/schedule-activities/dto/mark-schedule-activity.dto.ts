import { IsBoolean, IsOptional } from 'class-validator';

export class MarkScheduleActivityDto {
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
