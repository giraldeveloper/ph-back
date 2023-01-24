import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInmuebleDto {

  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  @ApiProperty({ example: "1", description: 'Bloque ubicacion del imbueble' })
  bloque: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  @ApiProperty({ example: "908", description: 'Número del imbueble' })
  numero: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  @ApiProperty({ example: "APARTAMENTO", description: 'Tipo de imbueble' })
  tipo: string;
}
