import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { Inmueble } from './entities/inmueble.entity';

@Injectable()
export class InmuebleService {

  constructor(
    @InjectRepository(Inmueble)
    private inmuebleRepository: Repository<Inmueble>,
  ) { }

  async create(createInmuebleDto: CreateInmuebleDto) {

    const inmuebleEntity: Inmueble = Inmueble.create();
    const { bloque, numero, tipo } = createInmuebleDto;
    inmuebleEntity.bloque = bloque;
    inmuebleEntity.numero = numero;
    inmuebleEntity.tipo = tipo;
    await Inmueble.save(inmuebleEntity);
    return inmuebleEntity;
  }

  findAll(): Promise<Inmueble[]> {
    return this.inmuebleRepository.find();
  }

  findOne(id: string): Promise<Inmueble> {
    return this.inmuebleRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.inmuebleRepository.delete(id);
  }

  async update(id: string, updateInmuebleDto: UpdateInmuebleDto) {
    const inmuebleEntity: Inmueble = await this.findOne(id);
    const { bloque, numero, tipo, activo } = updateInmuebleDto;
    inmuebleEntity.bloque = bloque;
    inmuebleEntity.numero = numero;
    inmuebleEntity.tipo = tipo;
    inmuebleEntity.activo = activo;
    await Inmueble.save(inmuebleEntity);
    return inmuebleEntity;
  }

}
