import { Module } from '@nestjs/common';
import { InmuebleService } from './inmueble.service';
import { InmuebleController } from './inmueble.controller';
import { Inmueble } from './entities/inmueble.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Inmueble])],
  controllers: [InmuebleController],
  providers: [InmuebleService]
})
export class InmuebleModule {}
