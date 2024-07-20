import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { DriversModule } from './drivers/drivers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TransfersModule } from './transfers/transfers.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // path to the static files
      serveRoot: '/public/',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DriversModule,
    VehiclesModule,
    TransfersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
