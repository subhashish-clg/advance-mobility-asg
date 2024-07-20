import { PartialType } from '@nestjs/mapped-types';
import { CreateVechicleDto } from './create-vehicle.dto';

export class UpdateVechicleDto extends PartialType(CreateVechicleDto) {}
