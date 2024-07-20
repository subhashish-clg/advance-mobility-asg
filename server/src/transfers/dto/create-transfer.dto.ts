import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class CreateTransferDto {
  @ApiProperty({ name: 'vehicleNumber' })
  vehicleNumber: string;

  @ApiProperty({ name: 'fromDriverID' })
  fromDriverID: number;

  @ApiProperty({ name: 'toDriverID' })
  toDriverID: number;
}
