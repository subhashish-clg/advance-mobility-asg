import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AutoCompleteDto {
  @ApiProperty({
    name: 'name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
