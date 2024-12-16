import { IsString } from 'class-validator';

export class UpdateOrderShippingDto {
  @IsString()
  trackingCompany: string;

  @IsString()
  trackingNumber: string;

  constructor(trackingCompany: string, trackingNumber: string) {
    this.trackingCompany = trackingCompany;
    this.trackingNumber = trackingNumber;
  }
}

