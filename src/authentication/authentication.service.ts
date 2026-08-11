import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthenticationRepository } from './authentication.repository';
import { LoginDto } from './dto/authenticate-dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = {
      userId: user.userId,
      email: user.email,
      role: user.roleId,
      name: user.name,
    };
    return {
      user: payload,
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.authenticationRepository.validateUser(dto.email);
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async refreshToken(refresh_token: string) {
    try {
      const payload = await this.jwtService.verify(refresh_token);
      const { userId, email, role, name } = payload;
      return {
        access_token: this.jwtService.sign(
          { userId, email, role, name },
          { expiresIn: '15m' },
        ),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
