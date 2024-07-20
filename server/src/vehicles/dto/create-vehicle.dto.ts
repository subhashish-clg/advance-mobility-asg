import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  isNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVechicleDto {
  @ApiProperty({
    name: 'vehicleNumber',
  })
  @IsNotEmpty()
  @IsString()
  vehicleNumber: string;

  @ApiProperty({
    name: 'vehicleType',
  })
  @IsNotEmpty()
  @IsString()
  vehicleType: string;

  @ApiProperty({
    name: 'pucCertificate',
    type: 'string',
    format: 'binary',
  })
  pucCertificate: any;

  @ApiProperty({
    name: 'insuranceCertificate',
    type: 'string',
    format: 'binary',
  })
  insuranceCertificate: any;

  @ApiProperty({
    name: 'owner',
    required: false,
  })
  @IsOptional()
  @IsString()
  owner?: string;
}
