import { Module } from '@nestjs/common';
import { ExcerciseUsersController } from './excercise-users.controller';
import { ExcerciseUsersService } from './excercise-users.service';
import { ExcerciseUsersRepository } from './excercise-users.repository';

@Module({
  controllers: [ExcerciseUsersController],
  providers: [ExcerciseUsersService, ExcerciseUsersRepository]
})
export class ExcerciseUsersModule {}
