import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsEmail,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty({ example: 'caspin', description: 'Username' })
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty({ example: 'example123', description: 'Password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  @ApiProperty({ example: 'Kevin Castro', description: 'Nombres y Apellidos' })
  nombre: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  @ApiProperty({
    example: 'https://my-images.com/file/5jDdyxw',
    description: 'Foto perfil',
  })
  foto: string;

  @IsInt()
  @ApiProperty({ example: '1', description: 'Perfil' })
  perfil: number;
}
