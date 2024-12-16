"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const orders_service_1 = require("./orders.service");
const order_repository_1 = require("../repositories/order.repository");
const order_entity_1 = require("../entities/order.entity");
describe('OrdersService', () => {
    let ordersService;
    let orderRepository;
    const mockOrderRepository = {
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findOne: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                orders_service_1.OrdersService,
                { provide: order_repository_1.OrderRepository, useValue: mockOrderRepository },
            ],
        }).compile();
        ordersService = module.get(orders_service_1.OrdersService);
        orderRepository = module.get(order_repository_1.OrderRepository);
    });
    it('should be defined', () => {
        expect(ordersService).toBeDefined();
    });
    describe('createOrder', () => {
        it('should create and return an order', async () => {
            const orderData = { id: "1", productId: 'prod1', quantity: 2, customerId: '23', items: [] };
            const order = new order_entity_1.Order();
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
            const order = new order_entity_1.Order();
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
