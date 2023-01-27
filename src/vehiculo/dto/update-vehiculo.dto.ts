import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateVehiculoDto } from './create-vehiculo.dto';

export class UpdateVehiculoDto extends PartialType(CreateVehiculoDto) {
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ example: true, description: 'Vehículo activo? (estado)' })
    activo: boolean;
}
