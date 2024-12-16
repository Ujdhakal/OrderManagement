import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>
  ) {}

  async createOrder(order: Partial<Order>): Promise<Order> {
    return this.repo.save(this.repo.create(order));
  }

  async findById(id: string): Promise<Order | null> {
    return this.repo.findOne({ where: { id } });
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    await this.repo.update(id, updates);
    const updatedOrder = await this.findById(id);

    if (!updatedOrder) {
      throw new Error(`Order with ID ${id} not found`);
    }

    return updatedOrder;
  }

  async deleteOrder(id: string): Promise<boolean> {
    const res = await this.repo.delete(id);
    return (res.affected ?? 0) > 0;
  }

  // Method to get all orders
  async findAll(): Promise<Order[]> {
    return this.repo.find();
  }

  // Method to get an order by ID with error handling
  async getOrderById(id: string): Promise<Order> {
    const order = await this.findById(id);
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return order;
  }
}
