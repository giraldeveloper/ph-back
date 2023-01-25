import { PartialType } from '@nestjs/swagger';
import { CreateInmuebleRoleDto } from './create-inmueble-role.dto';

export class UpdateInmuebleRoleDto extends PartialType(CreateInmuebleRoleDto) {}
