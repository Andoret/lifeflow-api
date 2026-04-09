import { Test, TestingModule } from '@nestjs/testing';
import { ExcerciseCategoriesController } from './excercise-categories.controller';
import { ExcerciseCategoriesService } from './excercise-categories.service';

describe('ExcerciseCategoriesController', () => {
  let controller: ExcerciseCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExcerciseCategoriesController],
      providers: [
        {
          provide: ExcerciseCategoriesService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExcerciseCategoriesController>(ExcerciseCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
