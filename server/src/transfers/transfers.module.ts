import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './entities/transfer.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Driver } from 'src/drivers/entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer, Vehicle, Driver])],
  controllers: [TransfersController],
  providers: [TransfersService],
})
export class TransfersModule {}
