import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { Order } from './entities/order.entity';
import { OrderRepository } from './repositories/order.repository';

import { CustomerServiceClient } from '../integrations/customer-service/customer.service-client';
import { InventoryServiceClient } from '../integrations/inventory-service/inventory.service-client';
import { InventoryServiceMockClient } from '../integrations/inventory-service/inventory.service-mock.client';
import { INVENTORY_SERVICE_TOKEN } from '../integrations/inventory-service/inventory-service.constants';
import { CUSTOMER_SERVICE_TOKEN } from 'src/integrations/customer-service/customer-service.constants';
import { CustomerServiceMockClient } from 'src/integrations/customer-service/customer.service-mock.client';
import { CustomLogger } from 'src/common/services/logger.service';

// Determine whether to use mock or real inventory service based on environment variable
const useMockService = process.env.USE_MOCK === 'true';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([Order]), // Registering the Order entity with TypeORM
        ConfigModule
    ],
    controllers: [OrdersController], // Defining the controller for handling incoming requests
    providers: [
        OrdersService, // Service that contains business logic related to orders
        OrderRepository, // Repository for database operations on orders
        {
            provide: CUSTOMER_SERVICE_TOKEN,
            useFactory: (configService: ConfigService) => {
                const useMockService = configService.get<string>('USE_MOCK') === 'true';
                return useMockService ? new CustomerServiceMockClient() : CustomerServiceClient;
            },
            inject: [ConfigService]
        },
        {
            provide: INVENTORY_SERVICE_TOKEN,
            useFactory: (configService: ConfigService) => {
                const useMockService = configService.get<string>('USE_MOCK') === 'true';
                return useMockService ? new InventoryServiceMockClient() : InventoryServiceClient;
            },
            inject: [ConfigService]
        },
        CustomLogger
    ],
    exports: [OrdersService], // Exporting OrdersService for use in other modules
})
export class OrdersModule { }
