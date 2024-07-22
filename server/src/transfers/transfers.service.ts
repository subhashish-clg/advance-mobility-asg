import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from './entities/transfer.entity';
import { EntityManager, Repository } from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Driver } from 'src/drivers/entities/driver.entity';

@Injectable()
export class TransfersService {
  constructor(
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createTransferDto: CreateTransferDto) {
    return this.entityManager.transaction(
      async (entityManager: EntityManager) => {
        const { vehicleNumber, fromDriverID, toDriverID } = createTransferDto;

        const vehicle = await entityManager.findOne(Vehicle, {
          where: { vehicleNumber },
        });

        const transferer = await entityManager.findOne(Driver, {
          where: { id: fromDriverID },
        });

        const transferee = await entityManager.findOne(Driver, {
          where: {
            id: toDriverID,
          },
        });

        vehicle.owner = transferee;
        await entityManager.save(vehicle);

        const transfer = new Transfer({
          vehicle: vehicle,
          fromDriver: transferer,
          toDriver: transferee,
          transferDate: new Date(),
        });

        return await entityManager.save(transfer);
      },
    );
  }

  async findAll() {
    return await this.transferRepository.find({
      relations: {
        vehicle: true,
        fromDriver: true,
        toDriver: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.transferRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        fromDriver: true,
        toDriver: true,
      },
    });
  }

  async remove(id: number) {
    return await this.transferRepository.delete({
      id: id,
    });
  }
}
