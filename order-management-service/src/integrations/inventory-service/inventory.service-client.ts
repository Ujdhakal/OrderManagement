import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InventoryServiceInterface, ProductCheck } from './inventory-service.interface';

@Injectable()
export class InventoryServiceClient implements InventoryServiceInterface  {
  constructor(private http: HttpService) {}

  async getProducts(items: Array<{ productId: string; variantId: string; quantity: number }>): Promise<ProductCheck[]> {
    // Mock call
    const response = await firstValueFrom(
      this.http.post(`http://inventoryservice.local/v1/check-stock`, { items })
    );
    return response.data;
  }
}
