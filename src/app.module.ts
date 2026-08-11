import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtAuthGuard } from './authentication/guards/jwt-auth.guard';
import { ExcerciseCategoriesModule } from './excercise-categories/excercise-categories.module';
import { ExcerciseUsersModule } from './excercise-users/excercise-users.module';
import { CategoriesExpensesModule } from './categories-expenses/categories-expenses.module';
import { ScheduleActivitiesModule } from './schedule-activities/schedule-activities.module';
import { ExpensesModule } from './expenses/expenses.module';
import { KitchenModule } from './kitchen/kitchen.module';


@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthenticationModule,
    ExcerciseCategoriesModule,
    ExcerciseUsersModule,
    CategoriesExpensesModule,
    ScheduleActivitiesModule,
    ExpensesModule,
    KitchenModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
