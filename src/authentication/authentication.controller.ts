import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/authenticate-dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Public } from './decorators/public.decorator';

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Public()
    @Post('login')
    async login(@Body() dto: LoginDto) {
        const data = await this.authenticationService.login(dto);
        return {
            status:true,
            message: 'Login successful',
            ...data,
        };
    }

    @Public()
    @Post('refresh-token')
    async refreshToken(@Body() dto: RefreshTokenDto) {
        const data = await this.authenticationService.refreshToken(dto.refresh_token);
        return {
            status:true,
            message: 'Refresh token successful',
            ...data,
        };
    }
}
