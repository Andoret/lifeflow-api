import { Test, TestingModule } from '@nestjs/testing';
import { ExcerciseCategoriesService } from './excercise-categories.service';
import { ExcerciseCategoriesRepository } from './excersice-categories.repository';

describe('ExcerciseCategoriesService', () => {
  let service: ExcerciseCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExcerciseCategoriesService,
        {
          provide: ExcerciseCategoriesRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExcerciseCategoriesService>(ExcerciseCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
