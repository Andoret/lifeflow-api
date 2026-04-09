import { Injectable } from '@nestjs/common';
import { ExcerciseUsersRepository } from './excercise-users.repository';

@Injectable()
export class ExcerciseUsersService {
    constructor(private readonly excerciseUsersRepository:ExcerciseUsersRepository){}
}
