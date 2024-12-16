"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const order_repository_1 = require("../repositories/order.repository");
const order_entity_1 = require("../entities/order.entity");
const customer_service_constants_1 = require("../../integrations/customer-service/customer-service.constants");
const inventory_service_constants_1 = require("../../integrations/inventory-service/inventory-service.constants");
let OrdersService = class OrdersService {
    orderRepository;
    inventoryService;
    customerService;
    constructor(orderRepository, inventoryService, customerService) {
        this.orderRepository = orderRepository;
        this.inventoryService = inventoryService;
        this.customerService = customerService;
    }
    async createOrder(dto) {
        const customer = await this.customerService.getCustomer(dto.customerId);
        if (!customer)
            this.throwBadRequest('Invalid customer');
        const productDetails = await this.inventoryService.getProducts(dto.items);
        if (!productDetails.every(pd => pd.inStock))
            this.throwBadRequest('Some products are out of stock');
        return this.orderRepository.createOrder({
            customerId: dto.customerId,
            items: dto.items,
            status: order_entity_1.OrderStatus.PROCESSING
        });
    }
    async updateOrderStatus(id, dto) {
        const order = await this.findOrderByIdOrThrow(id);
        order.status = dto.status;
        return this.orderRepository.updateOrder(id, order);
    }
    async updateShippingInfo(id, dto) {
        const order = await this.findOrderByIdOrThrow(id);
        order.trackingCompany = dto.trackingCompany;
        order.trackingNumber = dto.trackingNumber;
        return this.orderRepository.updateOrder(id, order);
    }
    async deleteOrder(id) {
        return this.orderRepository.deleteOrder(id);
    }
    async findAll() {
        return this.orderRepository.findAll();
    }
    async findOneById(id) {
        return this.findOrderByIdOrThrow(id);
    }
    // Helper Methods
    throwBadRequest(message) {
        throw new common_1.BadRequestException(message);
    }
    async findOrderByIdOrThrow(id) {
        const order = await this.orderRepository.findById(id);
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(inventory_service_constants_1.INVENTORY_SERVICE_TOKEN)),
    __param(2, (0, common_1.Inject)(customer_service_constants_1.CUSTOMER_SERVICE_TOKEN)),
    __metadata("design:paramtypes", [order_repository_1.OrderRepository, Object, Object])
], OrdersService);
