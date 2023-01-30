import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { VehiculoDto } from './dto/vehiculo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('vehiculo')
@Controller('vehiculo')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar un vehículo' })
  create(@Body() createVehiculoDto: VehiculoDto) {
    return this.vehiculoService.create(createVehiculoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas los vehiculos' })
  findAll() {
    return this.vehiculoService.findAll();
  }

  @Get('inmueble/:id')
  @ApiOperation({ summary: 'Buscar todos los vehiculos de un imbueble' })
  findAllByInmueble(@Param('id') inmuebleId: string) {
    return this.vehiculoService.findByInmueble(inmuebleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un vehículo por su id del registro' })
  findOne(@Param('id') id: string) {
    return this.vehiculoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un vehículo' })
  update(@Param('id') id: string, @Body() updateVehiculoDto: VehiculoDto) {
    return this.vehiculoService.update(id, updateVehiculoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un vehículo' })
  remove(@Param('id') id: string) {
    return this.vehiculoService.remove(id);
  }
}
