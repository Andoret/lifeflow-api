import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ExcerciseUsersRepository {
    constructor(private prisma: PrismaService){}
}