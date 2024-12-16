import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from '../services/orders.service';
import { Order } from '../entities/order.entity';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;

  const mockOrdersService = {
    createOrder: jest.fn(),
    updateOrder: jest.fn(),
    deleteOrder: jest.fn(),
    findOrderById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        { provide: OrdersService, useValue: mockOrdersService },
      ],
    }).compile();

    ordersController = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(ordersController).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create and return an order', async () => {
      const orderData = { id: "1", productId: 'prod1', quantity: 2, customerId: "23", items: [] };
      const order = new Order();
      Object.assign(order, orderData);

      mockOrdersService.createOrder.mockResolvedValue(order);

      const result = await ordersController.create(orderData);
      expect(result).toEqual(order);
      expect(mockOrdersService.createOrder).toHaveBeenCalledWith(orderData);
    });
  });

  describe('deleteOrder', () => {
    it('should delete the order', async () => {
      const orderId = "1";
      await ordersController.deleteOrder(orderId);
      expect(mockOrdersService.deleteOrder).toHaveBeenCalledWith(orderId);
    });
  });

  describe('findOrderById', () => {
    it('should return the order if found', async () => {
      const orderId = "1";
      const order = new Order();
      order.id = orderId;

      mockOrdersService.findOrderById.mockResolvedValue(order);

      const result = await ordersController.getOrderById(orderId);
      expect(result).toEqual(order);
      expect(mockOrdersService.findOrderById).toHaveBeenCalledWith(orderId);
    });

    it('should return null if order not found', async () => {
      const orderId = "1";
      mockOrdersService.findOrderById.mockResolvedValue(null);

      const result = await ordersController.getOrderById(orderId);
      expect(result).toBeNull();
      expect(mockOrdersService.findOrderById).toHaveBeenCalledWith(orderId);
    });
  });
});