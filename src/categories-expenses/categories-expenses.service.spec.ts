import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesExpensesService } from './categories-expenses.service';

describe('CategoriesExpensesService', () => {
  let service: CategoriesExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesExpensesService],
    }).compile();

    service = module.get<CategoriesExpensesService>(CategoriesExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
