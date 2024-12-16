import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  
  const options = new DocumentBuilder()
    .setTitle('Order Management API')
    .setDescription('API for managing orders')
    .setVersion('1.0')
    .build();
   
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  // Set a global prefix for all routes
  app.setGlobalPrefix('v1');

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automatically transform payloads to DTO instances
    whitelist: true, // Strip properties that are not in the DTO
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
  }));

  // Determine the port to listen on, with a default value fallback
  const port = process.env.PORT || 3000;

  // Start the application and listen on the specified port
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

// Invoke the bootstrap function to start the application
bootstrap();