import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthenticationRepository } from './authentication.repository'; 
@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationRepository]
})
export class AuthenticationModule {}
