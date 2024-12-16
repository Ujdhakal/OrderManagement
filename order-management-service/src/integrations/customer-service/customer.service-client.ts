import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CustomerServiceInterface } from './customer-service.interface';

@Injectable()
export class CustomerServiceClient implements CustomerServiceInterface{

  constructor(private http: HttpService) {}

  async getCustomer(customerId: string): Promise<any> {
    const response = await firstValueFrom(
      this.http.get(`http://customerservice.local/v1/customers/${customerId}`)
    );
    return response.data;
  }
}
