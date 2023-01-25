import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InmuebleRoleService } from './inmueble-role.service';
import { CreateInmuebleRoleDto } from './dto/create-inmueble-role.dto';
import { UpdateInmuebleRoleDto } from './dto/update-inmueble-role.dto';

@Controller('inmueble-role')
export class InmuebleRoleController {
  constructor(private readonly inmuebleRoleService: InmuebleRoleService) {}

  @Post()
  create(@Body() createInmuebleRoleDto: CreateInmuebleRoleDto) {
    return this.inmuebleRoleService.create(createInmuebleRoleDto);
  }

  @Get()
  findAll() {
    return this.inmuebleRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inmuebleRoleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInmuebleRoleDto: UpdateInmuebleRoleDto) {
    return this.inmuebleRoleService.update(+id, updateInmuebleRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inmuebleRoleService.remove(+id);
  }
}
