import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ETipoContacto } from 'src/common/enums/ETipoContacto';

export class ContactoDto {
  @IsString()
  @IsOptional()
  @Length(1, 36)
  @ApiProperty({
    example: '8b39c927-78b6-48d2-ac55-0230528cdacd',
    description: 'Id de la persona a la que pertenece el contacto',
  })
  personaId?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  @ApiProperty({
    enum: ETipoContacto,
    example: 'email',
    description: `Tipo de contacto: [${Object.values(ETipoContacto)}]`,
  })
  tipoContacto: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  @ApiProperty({
    example: 'andresfgiraldo@live.com',
    description: 'Dato de contacto segun el tipo',
  })
  valor: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: 'Dato de contacto principal? (estado)',
  })
  principal: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: 'Dato de contacto activo? (estado)',
  })
  activo: boolean;
}
