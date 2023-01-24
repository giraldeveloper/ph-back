import { PartialType } from '@nestjs/mapped-types';
import { CreateInmuebleDto } from './create-inmueble.dto';
import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInmuebleDto extends CreateInmuebleDto {

    @IsBoolean()
    @ApiProperty({ example: true, description: 'Imbueble activo? (estado)' })
    activo: boolean;
}
