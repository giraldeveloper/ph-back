import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { ETipoIdentificacion, ETipoPersona, Persona } from './entities/persona.entity';

@Injectable()
export class PersonaService {

  constructor(
    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>,
  ) { }

  async create(createPersonaDto: CreatePersonaDto) {
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
      fechaNacimiento
    } = createPersonaDto;

    const eTipoId: ETipoIdentificacion = ETipoIdentificacion[this.getKeyByValue(ETipoIdentificacion, tipoIdentificacion)];
    const eTipoPerso: ETipoPersona = ETipoPersona[this.getKeyByValue(ETipoPersona, tipoPersona)];

    const persona = await this.findByIdentification(eTipoId, numeroIdentificacion);

    if (eTipoId === ETipoIdentificacion.NIT && !razonSocial)
      return throwError(() => new HttpException({ message: 'Documento NIT debe tener razón social' }, HttpStatus.UNPROCESSABLE_ENTITY));

    if (eTipoPerso === ETipoPersona.JURIDICA && eTipoId !== ETipoIdentificacion.NIT)
      return throwError(() => new HttpException({ message: 'Persona jurídica debe tener NIT' }, HttpStatus.UNPROCESSABLE_ENTITY));

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
  }

  async findByIdentification(tipoId: ETipoIdentificacion, numeroId: string): Promise<Persona | undefined> {
    return await this.personaRepository.findOneBy({ tipoIdentificacion: tipoId, numeroIdentificacion: numeroId });
  }

  findAll(): Promise<Persona[]> {
    return this.personaRepository.find();
  }

  findOne(id: string): Promise<Persona> {
    return this.personaRepository.findOneBy({ id });
  }

  async update(id: string, updatePersonaDto: UpdatePersonaDto) {

    const persona: Persona = await this.findOne(id);
    if (!persona)
      return throwError(() => new HttpException({ message: 'Inmueble no encontrado' }, HttpStatus.NOT_FOUND));

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
      activo
    } = updatePersonaDto;

    const eTipoId: ETipoIdentificacion = ETipoIdentificacion[this.getKeyByValue(ETipoIdentificacion, tipoIdentificacion)];
    const eTipoPerso: ETipoPersona = ETipoPersona[this.getKeyByValue(ETipoPersona, tipoPersona)];

    if (eTipoId === ETipoIdentificacion.NIT && !razonSocial)
      return throwError(() => new HttpException({ message: 'Documento NIT debe tener razón social' }, HttpStatus.UNPROCESSABLE_ENTITY));

    if (eTipoPerso === ETipoPersona.JURIDICA && eTipoId !== ETipoIdentificacion.NIT)
      return throwError(() => new HttpException({ message: 'Persona jurídica debe tener NIT' }, HttpStatus.UNPROCESSABLE_ENTITY));

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
  }

  async remove(id: string): Promise<void> {
    await this.personaRepository.delete(id);
  }


  private getKeyByValue<T>(e: T, value: string): string {
    const indexOfFind = Object.values(e).indexOf(value as unknown as T);
    const key = Object.keys(e)[indexOfFind];
    return key;
  }
}
