import { Injectable } from '@nestjs/common';
import { CustomerServiceInterface } from './customer-service.interface';

@Injectable()
export class CustomerServiceMockClient implements CustomerServiceInterface {
  async getCustomer(customerId: string): Promise<any> {
    console.log('mock customer client')
    // Simple mock logic: Only a specific ID returns a valid customer
    if (customerId === 'cust123') {
      return { id: 'cust123', name: 'Mock Customer', valid: true };
    }
    return null; // Return null for any other customer ID
  }
}