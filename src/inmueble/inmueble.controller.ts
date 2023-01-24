import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { InmuebleService } from './inmueble.service';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidationExceptionInterceptor } from 'src/common/interceptors/validation.exception.interceptor';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

@ApiTags('imbueble')
@Controller('inmueble')
@UsePipes(
  new ValidationPipe({
    enableDebugMessages: true,
    transform: true,
    skipMissingProperties: false,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    errorHttpStatusCode: 422,
  }),
)
@UseInterceptors(ValidationExceptionInterceptor, ResponseInterceptor)
export class InmuebleController {
  constructor(private readonly inmuebleService: InmuebleService) {}

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

  @Post()
  @ApiOperation({ summary: 'Crear un imbueble' })
  create(@Body() createInmuebleDto: CreateInmuebleDto) {
    return this.inmuebleService.create(createInmuebleDto);
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
