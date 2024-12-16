"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const orders_controller_1 = require("./orders.controller");
const orders_service_1 = require("../services/orders.service");
const order_entity_1 = require("../entities/order.entity");
describe('OrdersController', () => {
    let ordersController;
    let ordersService;
    const mockOrdersService = {
        createOrder: jest.fn(),
        updateOrder: jest.fn(),
        deleteOrder: jest.fn(),
        findOrderById: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [orders_controller_1.OrdersController],
            providers: [
                { provide: orders_service_1.OrdersService, useValue: mockOrdersService },
            ],
        }).compile();
        ordersController = module.get(orders_controller_1.OrdersController);
        ordersService = module.get(orders_service_1.OrdersService);
    });
    it('should be defined', () => {
        expect(ordersController).toBeDefined();
    });
    describe('createOrder', () => {
        it('should create and return an order', async () => {
            const orderData = { id: "1", productId: 'prod1', quantity: 2, customerId: "23", items: [] };
            const order = new order_entity_1.Order();
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
            const order = new order_entity_1.Order();
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
