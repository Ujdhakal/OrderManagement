import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
// import * as redisStore from 'cache-manager-redis-store';
// import { Cache } from 'cache-manager';
import { OrdersModule } from './orders/orders.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Function to create TypeORM options based on the current environment
const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres', // Adapt to your database as needed
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'test1234',
  database: process.env.DB_NAME || 'OrderManager',
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // Automatically load entities
  synchronize: process.env.TYPEORM_SYNC === 'true', // Use env variable to toggle
});

@Module({
  imports: [
    // CacheModule.register({
    //     store: redisStore as any,
    //     // Optional settings
    //      ttl: 5, // seconds
    //   }),
    ConfigModule.forRoot({ isGlobal: true }), // Make ConfigModule global
    HttpModule, // Enables making external HTTP requests
    TypeOrmModule.forRoot(typeOrmConfig()), // Initialize with configuration function
    OrdersModule, // Import OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
