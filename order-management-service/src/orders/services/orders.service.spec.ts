import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let orderRepository: OrderRepository;

  const mockOrderRepository = {
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: OrderRepository, useValue: mockOrderRepository },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<OrderRepository>(OrderRepository);
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create and return an order', async () => {
      const orderData = { id: "1", productId: 'prod1', quantity: 2, customerId: '23', items: [] };
      const order = new Order();
      Object.assign(order, orderData);

      mockOrderRepository.create.mockReturnValue(order);
      mockOrderRepository.save.mockResolvedValue(order);

      const result = await ordersService.createOrder(orderData);
      expect(result).toEqual(order);
      expect(mockOrderRepository.create).toHaveBeenCalledWith(orderData);
      expect(mockOrderRepository.save).toHaveBeenCalledWith(order);
    });
  });

  describe('deleteOrder', () => {
    it('should delete the order', async () => {
      const orderId = "1";
      await ordersService.deleteOrder(orderId);
      expect(mockOrderRepository.delete).toHaveBeenCalledWith(orderId);
    });
  });

  describe('findOrderById', () => {
    it('should return the order if found', async () => {
      const orderId = "1";
      const order = new Order();
      order.id = orderId;

      mockOrderRepository.findOne.mockResolvedValue(order);

      const result = await ordersService.findOneById(orderId);
      expect(result).toEqual(order);
      expect(mockOrderRepository.findOne).toHaveBeenCalledWith(orderId);
    });

    it('should return null if order not found', async () => {
      const orderId = "1";
      mockOrderRepository.findOne.mockResolvedValue(null);

      const result = await ordersService.findOneById(orderId);
      expect(result).toBeNull();
      expect(mockOrderRepository.findOne).toHaveBeenCalledWith(orderId);
    });
  });
});
