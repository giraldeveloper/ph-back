import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('vehiculo')
@Controller('vehiculo')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar un vehículo' })
  create(@Body() createVehiculoDto: CreateVehiculoDto) {
    return this.vehiculoService.create(createVehiculoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas los vehiculos' })
  findAll() {
    return this.vehiculoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un vehículo por su id del registro' })
  findOne(@Param('id') id: string) {
    return this.vehiculoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un vehículo' })
  update(@Param('id') id: string, @Body() updateVehiculoDto: UpdateVehiculoDto) {
    return this.vehiculoService.update(+id, updateVehiculoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un vehículo' })
  remove(@Param('id') id: string) {
    return this.vehiculoService.remove(+id);
  }
}
