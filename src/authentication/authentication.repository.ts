import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthenticationRepository {
    constructor(private prisma: PrismaService) {}
    

    async validateUser(email: string) {
        const user = await this.prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                userId: true,
                email: true,
                roleId: true,
                active: true,
                password: true,
                name: true,
            }
        });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return user;
        
       
    }
}