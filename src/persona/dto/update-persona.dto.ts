import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreatePersonaDto } from './create-persona.dto';

// export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {}
export class UpdatePersonaDto extends CreatePersonaDto {

    @IsBoolean()
    @ApiProperty({ example: true, description: 'Persona activo? (estado)' })
    activo: boolean;
}

