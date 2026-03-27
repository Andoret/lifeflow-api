import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/authenticate-dto';
@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('login')
    async login(@Body() dto: LoginDto) {
        const user = await this.authenticationService.validateUser(dto);
        return {
            message: 'Login successful',
            user,
        };
    }
}


