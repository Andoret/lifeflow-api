import { Module } from '@nestjs/common';
import { ExcerciseUsersController } from './excercise-users.controller';
import { ExcerciseUsersService } from './excercise-users.service';

@Module({
  controllers: [ExcerciseUsersController],
  providers: [ExcerciseUsersService]
})
export class ExcerciseUsersModule {}
