import {  Injectable, NotFoundException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthenticationRepository } from './authentication.repository';
import { LoginDto } from './dto/authenticate-dto';
@Injectable()
export class AuthenticationService {

    constructor(private readonly authenticationRepository: AuthenticationRepository) {}

    async validateUser(dto: LoginDto) {
        const user = await this.authenticationRepository.validateUser(dto.email);
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new NotFoundException('Not found');
        }
        return {
            message: 'Login successful',
            token: '1234567890',
        };
    }
}