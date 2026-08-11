import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  Max,
  Matches,
  IsIn,
} from 'class-validator';
import { SCHEDULE_CATEGORIES } from '../constants/schedule-categories';

export class CreateScheduleActivityDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'activityDate must be in YYYY-MM-DD format',
  })
  activityDate: string;

  @IsNumber()
  @Min(0)
  @Max(23)
  hour: number;

  @IsString()
  @IsOptional()
  @IsIn(SCHEDULE_CATEGORIES)
  category?: string;

  @IsNumber()
  @IsOptional()
  @IsIn([1, 2, 3])
  priority?: number;
}
