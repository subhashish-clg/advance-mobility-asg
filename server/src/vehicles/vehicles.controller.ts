import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import * as fs from 'fs';

import { VechiclesService } from './vehicles.service';
import { CreateVechicleDto } from './dto/create-vehicle.dto';
import { UpdateVechicleDto } from './dto/update-vehicle.dto';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VechiclesController {
  constructor(
    private readonly vechiclesService: VechiclesService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a single vehicle' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'insuranceCertifcate', maxCount: 1 },
        { name: 'pucCertificate', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: join(__dirname, '..', '..', 'public', 'vehicles'),
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(
              null,
              `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
            );
          },
        }),
      },
    ),
  )
  async create(
    @Body() createVechicleDto: CreateVechicleDto,
    @UploadedFiles()
    files: {
      insuranceCertifcate: Express.Multer.File[];
      pucCertificate: Express.Multer.File[];
    },
  ) {
    const puc = files.pucCertificate[0];
    const insurance = files.insuranceCertifcate[0];

    return await this.vechiclesService.create({
      ...createVechicleDto,
      pucCertificate:
        this.configService.get('SERVER_URL') +
        'public/vehicles/' +
        puc.filename,
      insuranceCertificate:
        this.configService.get('SERVER_URL') +
        'public/vehicles/' +
        insurance.filename,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicles' })
  async findAll() {
    return await this.vechiclesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single vehicle by `id`' })
  async findOne(@Param('id') id: string) {
    const result = await this.vechiclesService.findOne(id);
    if (!result) {
      throw new HttpException(
        'Vehicle does not exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a vehicle by `id`' })
  async update(
    @Param('id') id: string,
    @Body() updateVechicleDto: UpdateVechicleDto,
  ) {
    const result = await this.vechiclesService.update(id, updateVechicleDto);

    if (!result) {
      throw new HttpException(
        'Vehicle does not exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta a vehicle by `id`' })
  async remove(@Param('id') id: string) {
    const results = await this.vechiclesService.remove(id);

    if (results.affected <= 0) {
      throw new HttpException(
        'Vehicle does not exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return results;
  }
}
