"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
// import { CacheModule } from '@nestjs/cache-manager';
// import * as redisStore from 'cache-manager-redis-store';
// import { Cache } from 'cache-manager';
const orders_module_1 = require("./orders/orders.module");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
// Function to create TypeORM options based on the current environment
const typeOrmConfig = () => ({
    type: 'postgres', // Adapt to your database as needed
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'test1234',
    database: process.env.DB_NAME || 'OrderManager',
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // Automatically load entities
    synchronize: process.env.TYPEORM_SYNC === 'true', // Use env variable to toggle
});
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            // CacheModule.register({
            //     store: redisStore as any,
            //     // Optional settings
            //      ttl: 5, // seconds
            //   }),
            config_1.ConfigModule.forRoot({ isGlobal: true }), // Make ConfigModule global
            axios_1.HttpModule, // Enables making external HTTP requests
            typeorm_1.TypeOrmModule.forRoot(typeOrmConfig()), // Initialize with configuration function
            orders_module_1.OrdersModule, // Import OrdersModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
