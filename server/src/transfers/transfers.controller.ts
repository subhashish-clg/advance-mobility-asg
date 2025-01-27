import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Transfer History')
@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a transfer record' })
  create(@Body() createTransferDto: CreateTransferDto) {
    return this.transfersService.create(createTransferDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transfer records' })
  async findAll() {
    return await this.transfersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a transfer record by `id`' })
  findOne(@Param('id') id: string) {
    return this.transfersService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transfer record by `id`' })
  remove(@Param('id') id: string) {
    return this.transfersService.remove(+id);
  }
}
