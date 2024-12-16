import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { UpdateOrderShippingDto } from '../dto/update-order-shipping.dto';
import { Order } from '../entities/order.entity';
import { CustomLogger } from 'src/common/services/logger.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService,
    private readonly logger: CustomLogger, // Inject the logger service
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateOrderDto): Promise<Order> {
    this.logger.log(`Creating order: ${JSON.stringify(dto)}`);
    return this.ordersService.createOrder(dto);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto
  ): Promise<Order> {
    return this.ordersService.updateOrderStatus(id, dto);
  }

  @Put(':id/shipping')
  async updateShipping(
    @Param('id') id: string,
    @Body() dto: UpdateOrderShippingDto
  ): Promise<Order> {
    return this.ordersService.updateShippingInfo(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting order with ID ${id}`);
    await this.ordersService.deleteOrder(id);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOneById(id);
  }
}
