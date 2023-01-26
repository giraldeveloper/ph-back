import { IsString, IsNotEmpty, Length, IsOptional, IsDate, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateInmuebleRoleDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Residente", description: 'Rol: [residente, apoderado, propietario]' })
    role: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty({ example: "1990-07-01", description: 'Fecha de inicio del rol' })
    fechaDesde: Date;

}
