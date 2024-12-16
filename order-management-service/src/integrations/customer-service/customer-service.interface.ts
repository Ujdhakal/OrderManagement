export interface CustomerServiceInterface {
    getCustomer(customerId: string): Promise<any>;
  }