import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthenticationRepository } from './authentication.repository'; 
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
   
  })],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationRepository,JwtStrategy]
})
export class AuthenticationModule {}
