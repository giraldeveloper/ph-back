import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';
import { Persona } from 'src/persona/entities/persona.entity';
import { PersonaService } from 'src/persona/persona.service';
import { VehiculoService } from 'src/vehiculo/vehiculo.service';
import { Repository } from 'typeorm';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { InmuebleApoderado } from './entities/inmueble-apoderado.entity';
import { InmueblePropietario } from './entities/inmueble-propietario.entity';
import { InmuebleResidente } from './entities/inmueble-residente.entity';
import { Inmueble } from './entities/inmueble.entity';

@Injectable()
export class InmuebleService {
  private readonly logger = new Logger(InmuebleService.name);

  constructor(
    private readonly personaService: PersonaService,
    private readonly vehiculoService: VehiculoService,
    @InjectRepository(Inmueble)
    private inmuebleRepository: Repository<Inmueble>,
    @InjectRepository(InmueblePropietario)
    private inmueblePropietarioRepository: Repository<InmueblePropietario>,
    @InjectRepository(InmuebleApoderado)
    private inmuebleApoderadoRepository: Repository<InmuebleApoderado>,
    @InjectRepository(InmuebleResidente)
    private inmuebleResidenteRepository: Repository<InmuebleResidente>,
  ) {}

  async create(inmuebleDto: CreateInmuebleDto) {
    try {
      this.logger.debug(`START create: ${JSON.stringify(inmuebleDto)}`);

      const {
        bloque,
        numero,
        tipo,
        activo,
        propietarios,
        apoderados,
        residentes,
        vehiculos,
      } = inmuebleDto;

      let inmueble = new Inmueble();

      inmueble.bloque = bloque;
      inmueble.numero = numero;
      inmueble.tipo = tipo;
      inmueble.activo = typeof activo !== undefined ? activo : true;

      inmueble = await this.inmuebleRepository.save(inmueble);
      this.logger.debug(`Inmueble: ${JSON.stringify(inmueble)}`);

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

      if (vehiculos) {
        for (const vehiculo of vehiculos) {
          vehiculo.inmuebleId = inmueble.id;
          this.vehiculoService.create(vehiculo);
        }
      }

      return inmueble;
    } catch (error) {
      return throwError(() => error);
    }
  }

  async update(id: string, inmuebleDto: CreateInmuebleDto) {
    try {
      this.logger.debug(`START update: ${JSON.stringify(inmuebleDto)}`);

      const {
        bloque,
        numero,
        tipo,
        activo,
        propietarios,
        apoderados,
        residentes,
        vehiculos,
      } = inmuebleDto;

      let inmueble = await this.inmuebleRepository.findOneBy({ id });

      inmueble.bloque = bloque;
      inmueble.numero = numero;
      inmueble.tipo = tipo;
      inmueble.activo = typeof activo !== undefined ? activo : true;

      inmueble = await this.inmuebleRepository.save(inmueble);
      this.logger.debug(`Inmueble: ${JSON.stringify(inmueble)}`);

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

      if (vehiculos) {
        for (const vehiculo of vehiculos) {
          vehiculo.inmuebleId = inmueble.id;
          this.vehiculoService.create(vehiculo);
        }
      }

      return inmueble;
    } catch (error) {
      return throwError(() => error);
    }
  }

  findAll(): Promise<Inmueble[]> {
    return this.inmuebleRepository.find();
  }

  async findOne(id: string): Promise<Inmueble> {
    return await this.inmuebleRepository.findOneBy({ id });
  }

  async findDetail(id: string) {
    /**
     * Datos base del inmueble
     */
    const inmueble = await this.inmuebleRepository.findOneBy({ id });

    /**
     * Datos de los propietarios
     */
    const inmueblePropietarios = await this.inmueblePropietarioRepository.find({
      where: { inmuebleId: inmueble.id },
    });
    const propietarios: Persona[] = [];
    inmueblePropietarios.map(async (p) => {
      propietarios.push(await Promise.resolve(p.propietario));
    });

    /**
     * Datos de los apoderados
     */
    const inmuebleApoderados = await this.inmuebleApoderadoRepository.find({
      where: { inmuebleId: inmueble.id },
    });
    const apoderados: Persona[] = [];
    inmuebleApoderados.map(async (p) => {
      apoderados.push(await Promise.resolve(p.apoderado));
    });

    /**
     * Datos de los residentes
     */
    const inmuebleResidentes = await this.inmuebleResidenteRepository.find({
      where: { inmuebleId: inmueble.id },
    });
    const residentes: Persona[] = [];
    inmuebleResidentes.map(async (p) => {
      residentes.push(await Promise.resolve(p.residente));
    });

    /**
     * Datos de los vehiculos
     */
    const vehiculos = await this.vehiculoService.findByInmueble(inmueble.id);

    return {
      ...inmueble,
      propietarios,
      apoderados,
      residentes,
      vehiculos,
    };
  }

  async remove(id: string): Promise<void> {
    await this.inmuebleRepository.delete(id);
  }

  async findByNomenclatura(
    bloque: string,
    numero: string,
  ): Promise<Inmueble | undefined> {
    this.logger.debug(
      `findByNomenclatura: ${JSON.stringify({ bloque, numero })}`,
    );
    return await this.inmuebleRepository.findOneBy({ bloque, numero });
  }

  async createInmueblePropietario(
    inmueble: Inmueble,
    propietario: Persona,
  ): Promise<InmueblePropietario> {
    this.logger.debug(
      `createInmueblePropietario: ${JSON.stringify({ inmueble, propietario })}`,
    );

    let inmueblePropietario = await this.findInmueblePropietario(
      inmueble.id,
      propietario.id,
    );
    if (!inmueblePropietario) inmueblePropietario = new InmueblePropietario();

    inmueblePropietario.inmuebleId = inmueble.id;
    inmueblePropietario.propietarioId = propietario.id;
    inmueblePropietario.fechaDesde = new Date();
    inmueblePropietario = await this.inmueblePropietarioRepository.save(
      inmueblePropietario,
    );
    return inmueblePropietario;
  }

  async findInmueblePropietario(
    inmueble: string,
    propietario: string,
  ): Promise<InmueblePropietario | undefined> {
    return await this.inmueblePropietarioRepository.findOneBy({
      inmuebleId: inmueble,
      propietarioId: propietario,
    });
  }

  async createInmuebleApoderado(
    inmueble: Inmueble,
    apoderado: Persona,
  ): Promise<InmuebleApoderado> {
    this.logger.debug(
      `createInmuebleApoderado: ${JSON.stringify({ inmueble, apoderado })}`,
    );

    let inmuebleApoderado = await this.findInmuebleApoderado(
      inmueble.id,
      apoderado.id,
    );
    if (!inmuebleApoderado) inmuebleApoderado = new InmuebleApoderado();

    inmuebleApoderado.inmuebleId = inmueble.id;
    inmuebleApoderado.apoderadoId = apoderado.id;
    inmuebleApoderado.fechaDesde = new Date();
    inmuebleApoderado = await this.inmuebleApoderadoRepository.save(
      inmuebleApoderado,
    );
    return inmuebleApoderado;
  }

  async findInmuebleApoderado(
    inmueble: string,
    apoderado: string,
  ): Promise<InmuebleApoderado | undefined> {
    return await this.inmuebleApoderadoRepository.findOneBy({
      inmuebleId: inmueble,
      apoderadoId: apoderado,
    });
  }

  async createInmuebleResidente(
    inmueble: Inmueble,
    apoderado: Persona,
  ): Promise<InmuebleResidente> {
    this.logger.debug(
      `createInmuebleResidente: ${JSON.stringify({ inmueble, apoderado })}`,
    );

    let inmuebleResidente = await this.findInmuebleResidente(
      inmueble.id,
      apoderado.id,
    );
    if (!inmuebleResidente) inmuebleResidente = new InmuebleResidente();

    inmuebleResidente.inmuebleId = inmueble.id;
    inmuebleResidente.residenteId = apoderado.id;
    inmuebleResidente.fechaDesde = new Date();
    inmuebleResidente = await this.inmuebleResidenteRepository.save(
      inmuebleResidente,
    );
    return inmuebleResidente;
  }

  async findInmuebleResidente(
    inmueble: string,
    residente: string,
  ): Promise<InmuebleResidente | undefined> {
    return await this.inmuebleResidenteRepository.findOneBy({
      inmuebleId: inmueble,
      residenteId: residente,
    });
  }
}
