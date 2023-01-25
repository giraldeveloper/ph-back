import { IsString, IsNotEmpty, Length, IsOptional, IsDate, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateInmuebleRoleDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Residente", description: 'Rol: [Residente, Apoderado, Propietario]' })
    role: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ example: "1990-07-01", description: 'Fecha Desde' })
    fechaDesde: Date;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ example: "1990-07-01", description: 'Fecha Hasta' })
    fechaHasta: Date;

}
