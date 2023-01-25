import { IsString, IsNotEmpty, Length, IsOptional, IsDate, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonaDto {

    @IsString()
    @IsNotEmpty()
    @Length(1, 3)
    @ApiProperty({ example: "CC", description: 'Tipo de identificación: [CC, CE, TI, RC, NIT]' })
    tipoIdentificacion: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 45)
    @ApiProperty({ example: "1144940800", description: 'Numero de identificación' })
    numeroIdentificacion: string;

    @IsString()
    @IsOptional()
    @Length(1, 45)
    @ApiProperty({ example: "Giraldo", description: 'Primer Apellido' })
    primerApellido: string;

    
    @IsString()
    @IsOptional()
    @Length(1, 45)
    @ApiProperty({ example: "Ortiz", description: 'Segundo Apellido' })
    segundoApellido: string;

    
    @IsString()
    @IsOptional()
    @Length(1, 45)
    @ApiProperty({ example: "Andrés", description: 'Primer Nombre' })
    primerNombre: string;

    
    @IsString()
    @IsOptional()
    @Length(1, 45)
    @ApiProperty({ example: "Felipe", description: 'Segundo Nombre' })
    segundoNombre: string;

    
    @IsString()
    @IsOptional()
    @Length(1, 100)
    @ApiProperty({ example: "Giraldo Developer SAS", description: 'Razon Social' })
    razonSocial: string;

    @IsString()
    @IsOptional()
    @Length(1, 100)
    @ApiProperty({ example: "GiraldoDev", description: 'Nombre Comercial' })
    nombreComercial: string;

    
    @IsString()
    @IsNotEmpty()
    @Length(1, 10)
    @ApiProperty({ example: "natural", description: 'Tipo de personería: [natural, juridica]' })
    tipoPersona: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty({ example: "1990-07-01", description: 'Fecha Nacimiento' })
    fechaNacimiento: Date;
}
