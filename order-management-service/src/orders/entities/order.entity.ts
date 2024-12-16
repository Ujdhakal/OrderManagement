import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum OrderStatus {
  PROCESSING = 'processing',
  CANCELED = 'canceled',
  DELIVERED = 'delivered'
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // Definite assignment assertion since TypeORM handles this.

  @Column()
  customerId!: string;

  @Column('jsonb')
  items!: Array<{ productId: string; variantId: string; quantity: number }>;

  @Column({ type: 'varchar', default: OrderStatus.PROCESSING })
  status: OrderStatus = OrderStatus.PROCESSING; // Default value.

  @Column({ nullable: true })
  trackingCompany?: string;

  @Column({ nullable: true })
  trackingNumber?: string;

  @CreateDateColumn()
  createdAt!: Date; // TypeORM handles this.

  @UpdateDateColumn()
  updatedAt!: Date; // TypeORM handles this.
}
