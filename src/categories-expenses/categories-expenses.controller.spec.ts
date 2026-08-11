import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesExpensesController } from './categories-expenses.controller';

describe('CategoriesExpensesController', () => {
  let controller: CategoriesExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesExpensesController],
    }).compile();

    controller = module.get<CategoriesExpensesController>(CategoriesExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
