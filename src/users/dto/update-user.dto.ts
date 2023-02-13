import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateUserDto extends CreateUserDto {
  @IsBoolean()
  @ApiProperty({ example: true, description: 'Usuario activo? (estado)' })
  estado: boolean;
}
