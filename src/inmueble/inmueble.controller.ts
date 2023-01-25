import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InmuebleService } from './inmueble.service';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('imbueble')
@Controller('inmueble')
export class InmuebleController {
  constructor(private readonly inmuebleService: InmuebleService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un imbueble' })
  create(@Body() createInmuebleDto: CreateInmuebleDto) {
    return this.inmuebleService.create(createInmuebleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los inmuebles' })
  findAll() {
    return this.inmuebleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un imbueble por su id' })
  findOne(@Param('id') id: string) {
    return this.inmuebleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un imbueble' })
  update(@Param('id') id: string, @Body() updateInmuebleDto: UpdateInmuebleDto) {
    return this.inmuebleService.update(id, updateInmuebleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un imbueble' })
  remove(@Param('id') id: string) {
    return this.inmuebleService.remove(id);
  }
}
