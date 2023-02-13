import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({
    example: 'maria',
    description: 'usuario',
  })
  username!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({
    example: 'guess',
    description: 'contraseña',
  })
  password!: string;
}
