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
  UploadedFile,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { ConfigService } from '@nestjs/config';
import { AutoCompleteDto } from './dto/auto-complete.dto';

@ApiTags('Drivers')
@Controller('drivers')
export class DriversController {
  constructor(
    private readonly driversService: DriversService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a driver' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('profilePhoto', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'public/profile'),
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  async create(
    @Body() createDriverDto: CreateDriverDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.driversService.create({
      ...createDriverDto,
      profilePhoto:
        this.configService.get('SERVER_URL') +
        'public/profile/' +
        file.filename,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all the drivers' })
  async findAll() {
    return await this.driversService.findAll();
  }

  @Post('autocomplete')
  @ApiOperation({ summary: 'Get all the drivers by name' })
  async findByName(@Body() autoCompleteDto: AutoCompleteDto) {
    return await this.driversService.autoComplete(autoCompleteDto.name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get driver by `id`' })
  async findOne(@Param('id') id: string) {
    const results = await this.driversService.findOne(+id);
    if (results) {
      return results;
    }

    throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update driver by `id`' })
  async update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return await this.driversService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete driver by `id`' })
  async remove(@Param('id') id: string) {
    const results = await this.driversService.remove(+id);

    if (results.affected <= 0) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
