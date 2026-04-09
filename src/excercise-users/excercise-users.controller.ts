import { Controller } from '@nestjs/common';
import { ExcerciseUsersService } from './excercise-users.service';
@Controller('excercise-users')
export class ExcerciseUsersController {
    constructor(private readonly excerciseUsersService:ExcerciseUsersService){}
}
