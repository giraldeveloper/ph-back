import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, throwError } from 'rxjs';
import { ETipoIdentificacion } from 'src/common/enums/ETipoIdentificacion';
import { ETipoPersona } from 'src/common/enums/ETipoPersona';
import { getKeyByValue } from 'src/common/enums/utils';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonaService {
  private readonly logger = new Logger(PersonaService.name);

  constructor(
    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>,
  ) {}

  async create(
    createPersonaDto: CreatePersonaDto,
  ): Promise<Persona | Observable<never>> {
    this.logger.debug(`create: ${JSON.stringify(createPersonaDto)}`);
    try {
      const {
        tipoIdentificacion,
        numeroIdentificacion,
        primerApellido,
        segundoApellido,
        primerNombre,
        segundoNombre,
        razonSocial,
        nombreComercial,
        tipoPersona,
        fechaNacimiento,
      } = createPersonaDto;

      const eTipoId: ETipoIdentificacion =
        ETipoIdentificacion[
          getKeyByValue(ETipoIdentificacion, tipoIdentificacion)
        ];
      const eTipoPerso: ETipoPersona =
        ETipoPersona[getKeyByValue(ETipoPersona, tipoPersona)];

      let persona = await this.findByIdentification(
        eTipoId,
        numeroIdentificacion,
      );
      if (!persona) persona = new Persona();

      if (eTipoPerso !== ETipoPersona.NATURAL && razonSocial)
        return throwError(
          () =>
            new HttpException(
              { message: 'Persona natural no debe tener razón social' },
              HttpStatus.UNPROCESSABLE_ENTITY,
            ),
        );

      if (eTipoId === ETipoIdentificacion.NIT && !razonSocial)
        return throwError(
          () =>
            new HttpException(
              { message: 'Documento NIT debe tener razón social' },
              HttpStatus.UNPROCESSABLE_ENTITY,
            ),
        );

      if (
        eTipoPerso === ETipoPersona.JURIDICA &&
        eTipoId !== ETipoIdentificacion.NIT
      )
        return throwError(
          () =>
            new HttpException(
              { message: 'Persona jurídica debe tener NIT' },
              HttpStatus.UNPROCESSABLE_ENTITY,
            ),
        );

      persona.tipoIdentificacion = eTipoId;
      persona.numeroIdentificacion = numeroIdentificacion;
      persona.primerApellido = primerApellido;
      persona.segundoApellido = segundoApellido;
      persona.primerNombre = primerNombre;
      persona.segundoNombre = segundoNombre;
      persona.razonSocial = razonSocial;
      persona.nombreComercial = nombreComercial;
      persona.tipoPersona = eTipoPerso;
      persona.fechaNacimiento = fechaNacimiento;

      return await this.personaRepository.save(persona);
    } catch (error) {
      return throwError(() => error);
    }
  }

  async findByIdentification(
    tipoId: ETipoIdentificacion,
    numeroId: string,
  ): Promise<Persona | undefined> {
    return await this.personaRepository.findOneBy({
      tipoIdentificacion: tipoId,
      numeroIdentificacion: numeroId,
    });
  }

  findAll(): Promise<Persona[]> {
    return this.personaRepository.find();
  }

  findOne(id: string): Promise<Persona> {
    return this.personaRepository.findOneBy({ id });
  }

  async update(id: string, updatePersonaDto: UpdatePersonaDto) {
    try {
      const persona: Persona = await this.findOne(id);
      if (!persona)
        return throwError(
          () =>
            new HttpException(
              { message: 'Inmueble no encontrado' },
              HttpStatus.NOT_FOUND,
            ),
        );

      const {
        tipoIdentificacion,
        numeroIdentificacion,
        primerApellido,
        segundoApellido,
        primerNombre,
        segundoNombre,
        razonSocial,
        nombreComercial,
        tipoPersona,
        fechaNacimiento,
        activo,
      } = updatePersonaDto;

      const eTipoId: ETipoIdentificacion =
        ETipoIdentificacion[
          getKeyByValue(ETipoIdentificacion, tipoIdentificacion)
        ];
      const eTipoPerso: ETipoPersona =
        ETipoPersona[getKeyByValue(ETipoPersona, tipoPersona)];

      if (eTipoId === ETipoIdentificacion.NIT && !razonSocial)
        return throwError(
          () =>
            new HttpException(
              { message: 'Documento NIT debe tener razón social' },
              HttpStatus.UNPROCESSABLE_ENTITY,
            ),
        );

      if (
        eTipoPerso === ETipoPersona.JURIDICA &&
        eTipoId !== ETipoIdentificacion.NIT
      )
        return throwError(
          () =>
            new HttpException(
              { message: 'Persona jurídica debe tener NIT' },
              HttpStatus.UNPROCESSABLE_ENTITY,
            ),
        );

      persona.tipoIdentificacion = eTipoId;
      persona.numeroIdentificacion = numeroIdentificacion;
      persona.primerApellido = primerApellido;
      persona.segundoApellido = segundoApellido;
      persona.primerNombre = primerNombre;
      persona.segundoNombre = segundoNombre;
      persona.razonSocial = razonSocial;
      persona.nombreComercial = nombreComercial;
      persona.tipoPersona = eTipoPerso;
      persona.fechaNacimiento = fechaNacimiento;
      persona.activo = activo;

      return await this.personaRepository.save(persona);
    } catch (error) {
      return throwError(() => error);
    }
  }

  async remove(id: string): Promise<void> {
    await this.personaRepository.delete(id);
  }
}
