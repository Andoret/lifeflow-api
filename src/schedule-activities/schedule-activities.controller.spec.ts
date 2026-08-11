import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleActivitiesController } from './schedule-activities.controller';

describe('ScheduleActivitiesController', () => {
  let controller: ScheduleActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleActivitiesController],
    }).compile();

    controller = module.get<ScheduleActivitiesController>(
      ScheduleActivitiesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
