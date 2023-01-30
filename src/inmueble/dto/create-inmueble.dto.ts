import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePersonaDto } from 'src/persona/dto/create-persona.dto';
import { Type } from 'class-transformer';
import { VehiculoDto } from 'src/vehiculo/dto/vehiculo.dto';

export class CreateInmuebleDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  @ApiProperty({ example: '1', description: 'Bloque ubicacion del imbueble' })
  bloque!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  @ApiProperty({ example: '908', description: 'Número del imbueble' })
  numero!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  @ApiProperty({ example: 'APARTAMENTO', description: 'Tipo de imbueble' })
  tipo: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'Imbueble activo? (estado)' })
  activo?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePersonaDto)
  @ApiProperty({
    description: 'Listado de propietarios',
    type: CreatePersonaDto,
    isArray: true,
  })
  propietarios?: CreatePersonaDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePersonaDto)
  @ApiProperty({
    description: 'Listado de apoderados',
    type: CreatePersonaDto,
    isArray: true,
  })
  apoderados?: CreatePersonaDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePersonaDto)
  @ApiProperty({
    description: 'Listado de residentes',
    type: CreatePersonaDto,
    isArray: true,
  })
  residentes?: CreatePersonaDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehiculoDto)
  @ApiProperty({
    description: 'Listado de vehiculos',
    type: VehiculoDto,
    isArray: true,
  })
  vehiculos?: VehiculoDto[];
}
