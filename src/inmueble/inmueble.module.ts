import { Module } from '@nestjs/common';
import { InmuebleService } from './inmueble.service';
import { InmuebleController } from './inmueble.controller';
import { Inmueble } from './entities/inmueble.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InmuebleApoderado } from './entities/inmueble-apoderado.entity';
import { InmuebleResidente } from './entities/inmueble-residente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inmueble, InmuebleApoderado, InmuebleApoderado, InmuebleResidente])],
  controllers: [InmuebleController],
  providers: [InmuebleService]
})
export class InmuebleModule {}
