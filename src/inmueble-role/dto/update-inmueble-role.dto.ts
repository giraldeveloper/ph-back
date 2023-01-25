import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateInmuebleRoleDto } from './create-inmueble-role.dto';

export class UpdateInmuebleRoleDto extends PartialType(CreateInmuebleRoleDto) {
    @IsBoolean()
    @ApiProperty({ example: true, description: 'Persona activo? (estado)' })
    activo: boolean;
}
