import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';
import { ETipoContacto } from 'src/common/enums/ETipoContacto';
import { getKeyByValue } from 'src/common/enums/utils';
import { Repository } from 'typeorm';
import { ContactoDto } from './dto/contacto.dto';
import { Contacto } from './entities/contacto.entity';

@Injectable()
export class ContactoService {
  constructor(
    @InjectRepository(Contacto)
    private readonly contactoRepository: Repository<Contacto>,
  ) {}

  async create(createContactoDto: ContactoDto) {
    const { personaId, tipoContacto, valor, principal, activo } =
      createContactoDto;

    const eTipoContacto: ETipoContacto =
      ETipoContacto[getKeyByValue(ETipoContacto, tipoContacto)];

    if (!this.validateValueForTypeContact(eTipoContacto, valor))
      return throwError(
        () =>
          new HttpException(
            {
              message: `Dato de contacto no valido para el tipo ${eTipoContacto}`,
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          ),
      );

    const contacto = new Contacto();
    contacto.personaId = personaId;
    contacto.tipoContacto = eTipoContacto;
    contacto.valor = valor;
    contacto.principal = principal;
    contacto.activo = typeof activo !== undefined ? activo : true;

    return await this.contactoRepository.save(contacto);
  }

  findAll(): Promise<Contacto[]> {
    return this.contactoRepository.find();
  }

  findOne(id: string): Promise<Contacto> {
    return this.contactoRepository.findOneBy({ id });
  }

  async findByPersona(personaId: string): Promise<Contacto[] | undefined> {
    return await this.contactoRepository.findBy({
      personaId: personaId,
    });
  }

  async update(id: string, updateContactoDto: ContactoDto) {
    const { personaId, tipoContacto, valor, principal, activo } =
      updateContactoDto;

    const eTipoContacto: ETipoContacto =
      ETipoContacto[getKeyByValue(ETipoContacto, tipoContacto)];

    if (!this.validateValueForTypeContact(eTipoContacto, valor))
      return throwError(
        () =>
          new HttpException(
            {
              message: `Dato de contacto no valido para el tipo ${eTipoContacto}`,
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          ),
      );

    const contacto = await this.contactoRepository.findOneBy({ id });

    if (!contacto)
      return throwError(
        () =>
          new HttpException(
            { message: 'Contacto no encontrado' },
            HttpStatus.NOT_FOUND,
          ),
      );

    contacto.personaId = personaId;
    contacto.tipoContacto = eTipoContacto;
    contacto.valor = valor;
    contacto.principal = principal;
    contacto.activo = typeof activo !== undefined ? activo : true;

    return await this.contactoRepository.save(contacto);
  }

  async remove(id: string): Promise<void> {
    await this.contactoRepository.delete(id);
  }

  validateValueForTypeContact(tipo: ETipoContacto, valor: string): boolean {
    switch (tipo) {
      case ETipoContacto.EMAIL:
        const reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        return reEmail.test(valor);

      case ETipoContacto.CELULAR:
        const reCelular = /([3]){1}([0-9]){2}([0-9]){7}$/;
        return reCelular.test(valor);

      case ETipoContacto.TELEFONO_FIJO:
        const reTelefono = /([6]){1}([0]){1}([0-9]){1}([0-9]){7}$/;
        return reTelefono.test(valor);

      case ETipoContacto.WHATSAPP:
        const reWA = /\+([0-9]){1,3}([3]){1}([0-9]){2}([0-9]){7}$/;
        return reWA.test(valor);

      default:
        return true;
    }
  }
}
