import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleActivitiesService } from './schedule-activities.service';

describe('ScheduleActivitiesService', () => {
  let service: ScheduleActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleActivitiesService],
    }).compile();

    service = module.get<ScheduleActivitiesService>(ScheduleActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
