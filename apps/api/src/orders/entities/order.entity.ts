import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 20, default: 'PENDING' })
  status!: string;

  @Column({ name: 'total_amount', type: 'integer' })
  totalAmount!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @OneToMany(() => OrderItemEntity, (item) => item.order)
  items!: OrderItemEntity[];
}
