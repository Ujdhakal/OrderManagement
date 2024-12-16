import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { UpdateOrderShippingDto } from '../dto/update-order-shipping.dto';
import { Order, OrderStatus } from '../entities/order.entity';
import { CustomerServiceInterface } from 'src/integrations/customer-service/customer-service.interface';
import { InventoryServiceInterface } from 'src/integrations/inventory-service/inventory-service.interface';
import { CUSTOMER_SERVICE_TOKEN } from 'src/integrations/customer-service/customer-service.constants';
import { INVENTORY_SERVICE_TOKEN } from '../../integrations/inventory-service/inventory-service.constants';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(INVENTORY_SERVICE_TOKEN) private readonly inventoryService: InventoryServiceInterface,
    @Inject(CUSTOMER_SERVICE_TOKEN) private readonly customerService: CustomerServiceInterface
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const customer = await this.customerService.getCustomer(dto.customerId);
    if (!customer) this.throwBadRequest('Invalid customer');

    const productDetails = await this.inventoryService.getProducts(dto.items);
    if (!productDetails.every(pd => pd.inStock)) this.throwBadRequest('Some products are out of stock');

    return this.orderRepository.createOrder({
      customerId: dto.customerId,
      items: dto.items,
      status: OrderStatus.PROCESSING
    });
  }

  async updateOrderStatus(id: string, dto: UpdateOrderStatusDto): Promise<Order> {
    const order = await this.findOrderByIdOrThrow(id);
    order.status = dto.status;
    return this.orderRepository.updateOrder(id, order);
  }

  async updateShippingInfo(id: string, dto: UpdateOrderShippingDto): Promise<Order> {
    const order = await this.findOrderByIdOrThrow(id);
    order.trackingCompany = dto.trackingCompany;
    order.trackingNumber = dto.trackingNumber;
    return this.orderRepository.updateOrder(id, order);
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.orderRepository.deleteOrder(id);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async findOneById(id: string): Promise<Order> {
    return this.findOrderByIdOrThrow(id);
  }

  // Helper Methods
  private throwBadRequest(message: string): void {
    throw new BadRequestException(message);
  }

  private async findOrderByIdOrThrow(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
