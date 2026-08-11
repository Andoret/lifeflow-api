import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  Min,
  Max,
  Matches,
  IsIn,
} from 'class-validator';
import { SCHEDULE_CATEGORIES } from '../constants/schedule-categories';

export class UpdateScheduleActivityDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'activityDate must be in YYYY-MM-DD format',
  })
  activityDate?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(23)
  hour?: number;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsString()
  @IsOptional()
  @IsIn(SCHEDULE_CATEGORIES)
  category?: string;

  @IsNumber()
  @IsOptional()
  @IsIn([1, 2, 3])
  priority?: number;
}
