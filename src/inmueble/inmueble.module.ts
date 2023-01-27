import { Module } from '@nestjs/common';
import { InmuebleService } from './inmueble.service';
import { InmuebleController } from './inmueble.controller';
import { Inmueble } from './entities/inmueble.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InmueblePropietario } from './entities/inmueble-propietario.entity';
import { InmuebleApoderado } from './entities/inmueble-apoderado.entity';
import { InmuebleResidente } from './entities/inmueble-residente.entity';
import { PersonaModule } from 'src/persona/persona.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inmueble, InmueblePropietario, InmuebleApoderado, InmuebleResidente]),
    PersonaModule,
  ],
  controllers: [InmuebleController],
  providers: [InmuebleService],
  exports: [InmuebleService]
})
export class InmuebleModule { }
