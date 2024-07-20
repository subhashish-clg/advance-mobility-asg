import { Module } from '@nestjs/common';
import { VechiclesService } from './vehicles.service';
import { VechiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Driver } from 'src/drivers/entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Driver])],
  controllers: [VechiclesController],
  providers: [VechiclesService],
})
export class VehiclesModule {}
