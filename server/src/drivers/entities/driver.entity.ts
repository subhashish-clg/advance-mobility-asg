import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'name' })
  name: string;

  @Column({ unique: true, nullable: false, name: 'phone_number' })
  phoneNumber: string;

  @Column({ nullable: false, name: 'profile_photo', type: 'text' })
  profilePhoto: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.owner, { cascade: false })
  vehicles: Vehicle[];

  constructor(entity: Partial<Driver>) {
    Object.assign(this, entity);
  }
}
