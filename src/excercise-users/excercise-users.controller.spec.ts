import { Test, TestingModule } from '@nestjs/testing';
import { ExcerciseUsersController } from './excercise-users.controller';

describe('ExcerciseUsersController', () => {
  let controller: ExcerciseUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExcerciseUsersController],
    }).compile();

    controller = module.get<ExcerciseUsersController>(ExcerciseUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
