import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverDto } from './create-driver.dto';
import { IsEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  @IsEmpty()
  @IsString()
  @ApiProperty({
    name: 'name',
    required: false,
  })
  name?: string;

  @IsEmpty()
  @IsString()
  @ApiProperty({
    name: 'phoneNumber',
    required: false,
  })
  phoneNumber?: string;

  @IsEmpty()
  @IsString()
  @ApiProperty({
    name: 'name',
    required: false,
  })
  profilePhoto?: string;
}
