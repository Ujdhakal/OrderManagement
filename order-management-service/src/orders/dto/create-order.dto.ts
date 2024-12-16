import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
    @IsString()
    @IsNotEmpty()
    productId: string;
  
    @IsString()
    @IsNotEmpty()
    variantId: string;
  
    @IsNotEmpty()
    quantity: number;
  
    constructor(productId: string, variantId: string, quantity: number) {
      this.productId = productId;
      this.variantId = variantId;
      this.quantity = quantity;
    }
  }
  
  export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    customerId: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
  
    constructor(customerId: string, items: OrderItemDto[]) {
      this.customerId = customerId;
      this.items = items;
    }
  }
  