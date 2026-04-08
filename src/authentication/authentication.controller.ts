import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/authenticate-dto';
@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('login')
    async login(@Body() dto: LoginDto) {
        const data = await this.authenticationService.login(dto);
        return {
            status:true,
            message: 'Login successful',    
            ...data,
        };
    }

    @Post('refresh-token')
    async refreshToken(@Body() body) {
        const data = await this.authenticationService.refreshToken(body.refresh_token);
        return {
            status:true,
            message: 'Refresh token successful',
            ...data,
        };
    }
}


