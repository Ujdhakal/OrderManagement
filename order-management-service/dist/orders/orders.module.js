"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const orders_controller_1 = require("./controllers/orders.controller");
const orders_service_1 = require("./services/orders.service");
const order_entity_1 = require("./entities/order.entity");
const order_repository_1 = require("./repositories/order.repository");
const customer_service_client_1 = require("../integrations/customer-service/customer.service-client");
const inventory_service_client_1 = require("../integrations/inventory-service/inventory.service-client");
const inventory_service_mock_client_1 = require("../integrations/inventory-service/inventory.service-mock.client");
const inventory_service_constants_1 = require("../integrations/inventory-service/inventory-service.constants");
const customer_service_constants_1 = require("../integrations/customer-service/customer-service.constants");
const customer_service_mock_client_1 = require("../integrations/customer-service/customer.service-mock.client");
const logger_service_1 = require("../common/services/logger.service");
// Determine whether to use mock or real inventory service based on environment variable
const useMockService = process.env.USE_MOCK === 'true';
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order]), // Registering the Order entity with TypeORM
            config_1.ConfigModule
        ],
        controllers: [orders_controller_1.OrdersController], // Defining the controller for handling incoming requests
        providers: [
            orders_service_1.OrdersService, // Service that contains business logic related to orders
            order_repository_1.OrderRepository, // Repository for database operations on orders
            {
                provide: customer_service_constants_1.CUSTOMER_SERVICE_TOKEN,
                useFactory: (configService) => {
                    const useMockService = configService.get('USE_MOCK') === 'true';
                    return useMockService ? new customer_service_mock_client_1.CustomerServiceMockClient() : customer_service_client_1.CustomerServiceClient;
                },
                inject: [config_1.ConfigService]
            },
            {
                provide: inventory_service_constants_1.INVENTORY_SERVICE_TOKEN,
                useFactory: (configService) => {
                    const useMockService = configService.get('USE_MOCK') === 'true';
                    return useMockService ? new inventory_service_mock_client_1.InventoryServiceMockClient() : inventory_service_client_1.InventoryServiceClient;
                },
                inject: [config_1.ConfigService]
            },
            logger_service_1.CustomLogger
        ],
        exports: [orders_service_1.OrdersService], // Exporting OrdersService for use in other modules
    })
], OrdersModule);
