import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({
    name: 'name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    name: 'phoneNumber',
    description: 'Phone number of the user (without Country Code).',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    name: 'profilePhoto',
    description: 'Profile photo of the user.',
    type: 'string',
    format: 'binary',
  })
  profilePhoto: any;
}
