import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { CreateKitchenRequestDto } from './dto/create-kitchen-request.dto';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';

@Controller('kitchen/requests')
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @Post()
  async create(
    @Body() dto: CreateKitchenRequestDto,
  ) {
    const userId=3
    const request = await this.kitchenService.create(userId, dto);
    return { status: true, request };
  }

  @Get()
  async findAll(@CurrentUser('userId') userId: number) {
    const requests = await this.kitchenService.findByUser(userId);
    return { status: true, requests };
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('userId') userId: number,
  ) {
    const request = await this.kitchenService.findById(id, userId);
    return { status: true, request };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('userId') userId: number,
  ) {
    const request = await this.kitchenService.delete(id, userId);
    return { status: true, request };
  }
}
