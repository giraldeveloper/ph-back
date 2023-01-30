import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactoService } from './contacto.service';
import { ContactoDto } from './dto/contacto.dto';

@ApiTags('contacto')
@Controller('contacto')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar un contacto' })
  create(@Body() createContactoDto: ContactoDto) {
    return this.contactoService.create(createContactoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los contactos' })
  findAll() {
    return this.contactoService.findAll();
  }

  @Get('persona/:id')
  @ApiOperation({ summary: 'Buscar todos los contactos de una persona' })
  findAllByPerson(@Param('id') personaId: string) {
    return this.contactoService.findByPersona(personaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un contacto por su id del registro' })
  findOne(@Param('id') id: string) {
    return this.contactoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un contacto' })
  update(@Param('id') id: string, @Body() updateContactoDto: ContactoDto) {
    return this.contactoService.update(id, updateContactoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un contacto' })
  remove(@Param('id') id: string) {
    return this.contactoService.remove(id);
  }
}
