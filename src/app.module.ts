import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ExcerciseCategoriesModule } from './excercise-categories/excercise-categories.module';
import { ExcerciseUsersModule } from './excercise-users/excercise-users.module';


@Module({
  imports: [UsersModule, PrismaModule, AuthenticationModule, ExcerciseCategoriesModule, ExcerciseUsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
