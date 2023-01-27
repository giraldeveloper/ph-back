import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateVehiculoDto {
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

}
