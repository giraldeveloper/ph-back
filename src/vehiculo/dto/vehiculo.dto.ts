import { IsString, IsNotEmpty, Length, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class VehiculoDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 45)
    @ApiProperty({ example: "motocicleta", description: 'Tipo de vehículo: [motocicleta, carro]' })
    tipoVehiculo: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 45)
    @ApiProperty({ example: "PMQ97C", description: 'Placa de vehículo' })
    placa: string;

    @IsString()
    @IsOptional()
    @Length(1, 45)
    @ApiProperty({ example: "Rojo", description: 'Color de vehículo' })
    color: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ example: true, description: 'Vehículo activo? (estado)' })
    activo: boolean;

    @IsString()
    @IsNotEmpty()
    @Length(1, 36)
    @ApiProperty({ example: "8b39c927-78b6-48d2-ac55-0230528cdacd", description: 'Id del inmueble al que pertenece el vehiculo' })
    inmuebleId: string;

}
