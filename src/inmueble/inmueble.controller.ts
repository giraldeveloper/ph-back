import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { InmuebleService } from './inmueble.service';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';

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
export class InmuebleController {
  constructor(private readonly inmuebleService: InmuebleService) {}

  @Get()
  findAll() {
    return this.inmuebleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inmuebleService.findOne(id);
  }

  @Post()
  create(@Body() createInmuebleDto: CreateInmuebleDto) {
    return this.inmuebleService.create(createInmuebleDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInmuebleDto: UpdateInmuebleDto) {
    return this.inmuebleService.update(id, updateInmuebleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inmuebleService.remove(id);
  }
}
