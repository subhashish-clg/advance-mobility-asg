import { Driver } from 'src/drivers/entities/driver.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicle_number' })
  vehicle: Vehicle;

  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'from_driver' })
  fromDriver: Driver;

  @ManyToOne(() => Driver, { nullable: true })
  @JoinColumn({ name: 'to_driver' })
  toDriver: Driver;

  @CreateDateColumn({ type: 'datetime', name: 'transfer_date' })
  transferDate: Date;

  constructor(entity: Partial<Transfer>) {
    Object.assign(this, entity);
  }
}
