import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { EntityManager, Like, Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    const driver = new Driver(createDriverDto);

    return await this.entityManager.save(driver);
  }

  async findAll() {
    return await this.driverRepository.find();
  }

  async autoComplete(name: string) {
    return await this.driverRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
  }

  async findOne(id: number) {
    return await this.driverRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.driverRepository.findOneBy({ id });

    Object.assign(driver, updateDriverDto);

    return await this.driverRepository.save(driver);
  }

  async remove(id: number) {
    const results = await this.driverRepository.delete(id);

    return results;
  }
}
