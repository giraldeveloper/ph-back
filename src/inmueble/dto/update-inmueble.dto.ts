import { PartialType } from '@nestjs/mapped-types';
import { CreateInmuebleDto } from './create-inmueble.dto';
import { IsBoolean } from 'class-validator';

export class UpdateInmuebleDto extends PartialType(CreateInmuebleDto) {

    @IsBoolean()
    activo: boolean;
}
