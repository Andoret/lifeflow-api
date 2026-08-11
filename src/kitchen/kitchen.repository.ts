import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class KitchenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, ingredients: string[], reqResponse: string) {
    try {
      return await this.prisma.kitchenRequests.create({
        data: { userId, ingredients, reqResponse },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create kitchen request');
    }
  }

  async findByUser(userId: number) {
    try {
      return await this.prisma.kitchenRequests.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 20,
      });
    } catch {
      throw new InternalServerErrorException('Failed to find kitchen requests');
    }
  }

  async findByIdAndUser(kitchenRequestId: number, userId: number) {
    const request = await this.prisma.kitchenRequests.findFirst({
      where: { kitchenRequestId, userId },
    });
    if (!request) {
      throw new NotFoundException('Kitchen request not found');
    }
    return request;
  }

  async delete(kitchenRequestId: number, userId: number) {
    await this.findByIdAndUser(kitchenRequestId, userId);
    try {
      return await this.prisma.kitchenRequests.delete({
        where: { kitchenRequestId },
      });
    } catch {
      throw new InternalServerErrorException('Failed to delete kitchen request');
    }
  }
}
