import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVechicleDto } from './dto/create-vehicle.dto';
import { UpdateVechicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { EntityManager, Repository } from 'typeorm';
import { Driver } from 'src/drivers/entities/driver.entity';

@Injectable()
export class VechiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createVechicleDto: CreateVechicleDto) {
    const vehicle = await this.vehicleRepository.findOneBy({
      vehicleNumber: createVechicleDto.vehicleNumber,
    });
    const newVehicle = new Vehicle({
      ...createVechicleDto,
      owner: null,
    });

    if (vehicle) {
      throw new HttpException(
        'Vehicle already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if ('owner' in createVechicleDto) {
      const driver = await this.driverRepository.findOneBy({
        id: parseInt(createVechicleDto.owner),
      });
      newVehicle.owner = driver;
    }

    console.log(newVehicle);

    return await this.entityManager.save(newVehicle);
  }

  async findAll() {
    return await this.vehicleRepository.find({
      relations: {
        owner: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.vehicleRepository.findOne({
      where: {
        vehicleNumber: id,
      },
      relations: {
        owner: true,
      },
    });
  }

  async update(id: string, updateVechicleDto: UpdateVechicleDto) {
    const vehicle = await this.vehicleRepository.findOneBy({
      vehicleNumber: id,
    });

    if (!vehicle) {
      return null;
    }

    Object.assign(vehicle, {
      vehicleNumber: vehicle.vehicleNumber,
      ...updateVechicleDto,
    });

    return await this.entityManager.save(vehicle);
  }

  async remove(id: string) {
    return await this.vehicleRepository.delete({
      vehicleNumber: id,
    });
  }
}
