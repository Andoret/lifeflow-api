import { Test, TestingModule } from '@nestjs/testing';
import { ExcerciseUsersService } from './excercise-users.service';

describe('ExcerciseUsersService', () => {
  let service: ExcerciseUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExcerciseUsersService],
    }).compile();

    service = module.get<ExcerciseUsersService>(ExcerciseUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
