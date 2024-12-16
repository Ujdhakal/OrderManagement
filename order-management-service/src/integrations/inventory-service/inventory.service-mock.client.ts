import { Injectable } from '@nestjs/common';
import { InventoryServiceInterface } from './inventory-service.interface';

@Injectable()
export class InventoryServiceMockClient implements InventoryServiceInterface {
  async getProducts(items: Array<{ productId: string; variantId: string; quantity: number }>) {
    return items.map(item => ({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      inStock: true
    }));
  }
}
