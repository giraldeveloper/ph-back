import {
  IsString,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateInmuebleDto {

  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  bloque: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  numero: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  tipo: string;
}
