import { Driver } from 'src/drivers/entities/driver.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryColumn({ type: 'varchar', length: 50, name: 'vehicle_number' })
  vehicleNumber: string;

  @Column({ type: 'text', name: 'vehicle_type' })
  vehicleType: string;

  @Column({ type: 'text', name: 'puc_certificate' })
  pucCertificate: string;

  @Column({ type: 'text', name: 'insurance_certificate' })
  insuranceCertificate: string;

  @ManyToOne(() => Driver, (driver) => driver.vehicles, {
    cascade: false,
    nullable: true,
  })
  @JoinColumn({ name: 'owner_id' })
  owner: Driver;

  constructor(entity: Partial<Vehicle>) {
    Object.assign(this, entity);
  }
}
