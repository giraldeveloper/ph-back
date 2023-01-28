import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from 'src/persona/entities/persona.entity';
import { PersonaService } from 'src/persona/persona.service';
import { Repository } from 'typeorm';
import { InmuebleDto } from './dto/inmueble.dto';
import { InmuebleApoderado } from './entities/inmueble-apoderado.entity';
import { InmueblePropietario } from './entities/inmueble-propietario.entity';
import { InmuebleResidente } from './entities/inmueble-residente.entity';
import { Inmueble } from './entities/inmueble.entity';

@Injectable()
export class InmuebleService {

  private readonly logger = new Logger(InmuebleService.name);

  constructor(
    private readonly personaService: PersonaService,
    @InjectRepository(Inmueble)
    private inmuebleRepository: Repository<Inmueble>,
    @InjectRepository(InmueblePropietario)
    private inmueblePropietarioRepository: Repository<InmueblePropietario>,
    @InjectRepository(InmuebleApoderado)
    private inmuebleApoderadoRepository: Repository<InmuebleApoderado>,
    @InjectRepository(InmuebleResidente)
    private inmuebleResidenteRepository: Repository<InmuebleResidente>,
  ) { }

  async create(inmuebleDto: InmuebleDto) {
    let inmueble = await this.findByNomenclatura(inmuebleDto.bloque, inmuebleDto.numero);
    this.createOrUpdate(inmuebleDto, inmueble);
  }

  async update(id: string, inmuebleDto: InmuebleDto) {
    let inmueble = await this.findOne(id);
    this.createOrUpdate(inmuebleDto, inmueble);
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



  async createOrUpdate(inmuebleDto: InmuebleDto, inmueble: Inmueble) {
    this.logger.debug(`START InmuebleService.createOrUpdate: ${JSON.stringify(inmuebleDto)}`)

    const {
      bloque,
      numero,
      tipo, activo,
      propietarios,
      apoderados,
      residentes
    } = inmuebleDto;


    if (!inmueble) inmueble = new Inmueble();

    inmueble.bloque = bloque;
    inmueble.numero = numero;
    inmueble.tipo = tipo;

    if (typeof activo !== undefined)
      inmueble.activo = activo

    inmueble = await this.inmuebleRepository.save(inmueble);

    if (propietarios) {
      for (const propietario of propietarios) {
        const persona = await this.personaService.create(propietario);
        if (persona instanceof Persona) {
          this.createInmueblePropietario(inmueble, persona);
        }
      }
    }

    if (apoderados) {
      for (const apoderado of apoderados) {
        const persona = await this.personaService.create(apoderado);
        if (persona instanceof Persona) {
          this.createInmuebleApoderado(inmueble, persona);
        }
      }
    }

    if (residentes) {
      for (const residente of residentes) {
        const persona = await this.personaService.create(residente);
        if (persona instanceof Persona) {
          this.createInmuebleResidente(inmueble, persona);
        }
      }
    }
  }

  async findByNomenclatura(bloque: string, numero: string): Promise<Inmueble | undefined> {
    return await this.inmuebleRepository.findOneBy({ bloque, numero });
  }



  async createInmueblePropietario(inmueble: Inmueble, propietario: Persona): Promise<InmueblePropietario> {

    let inmueblePropietario = await this.findInmueblePropietario(inmueble.id, propietario.id);
    if (!inmueblePropietario) inmueblePropietario = new InmueblePropietario();

    inmueblePropietario.inmuebleId = inmueble.id;
    inmueblePropietario.propietarioId = propietario.id;
    inmueblePropietario.fechaDesde = new Date()
    inmueblePropietario = await this.inmueblePropietarioRepository.save(inmueblePropietario);
    return inmueblePropietario;
  }

  async findInmueblePropietario(inmueble: string, propietario: string): Promise<InmueblePropietario | undefined> {
    return await this.inmueblePropietarioRepository.findOneBy({ inmuebleId: inmueble, propietarioId: propietario});
  }

  async createInmuebleApoderado(inmueble: Inmueble, apoderado: Persona): Promise<InmuebleApoderado> {

    let inmuebleApoderado = await this.findInmuebleApoderado(inmueble.id, apoderado.id);
    if (!inmuebleApoderado) inmuebleApoderado = new InmuebleApoderado();

    inmuebleApoderado.inmuebleId = inmueble.id;
    inmuebleApoderado.apoderadoId = apoderado.id;
    inmuebleApoderado.fechaDesde = new Date()
    inmuebleApoderado = await this.inmuebleApoderadoRepository.save(inmuebleApoderado);
    return inmuebleApoderado;
  }

  async findInmuebleApoderado(inmueble: string, apoderado: string): Promise<InmuebleApoderado | undefined> {
    return await this.inmuebleApoderadoRepository.findOneBy({ inmuebleId: inmueble, apoderadoId: apoderado});
  }

  async createInmuebleResidente(inmueble: Inmueble, apoderado: Persona): Promise<InmuebleResidente> {

    let inmuebleResidente = await this.findInmuebleResidente(inmueble.id, apoderado.id);
    if (!inmuebleResidente) inmuebleResidente = new InmuebleResidente();

    inmuebleResidente.inmuebleId = inmueble.id;
    inmuebleResidente.residenteId = apoderado.id;
    inmuebleResidente.fechaDesde = new Date()
    inmuebleResidente = await this.inmuebleResidenteRepository.save(inmuebleResidente);
    return inmuebleResidente;
  }

  async findInmuebleResidente(inmueble: string, residente: string): Promise<InmuebleResidente | undefined> {
    return await this.inmuebleResidenteRepository.findOneBy({ inmuebleId: inmueble, residenteId: residente });
  }

}
