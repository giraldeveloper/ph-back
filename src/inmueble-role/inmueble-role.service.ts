import { Injectable } from '@nestjs/common';
import { CreateInmuebleRoleDto } from './dto/create-inmueble-role.dto';
import { UpdateInmuebleRoleDto } from './dto/update-inmueble-role.dto';

@Injectable()
export class InmuebleRoleService {
  create(createInmuebleRoleDto: CreateInmuebleRoleDto) {
    return 'This action adds a new inmuebleRole';
  }

  findAll() {
    return `This action returns all inmuebleRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inmuebleRole`;
  }

  update(id: number, updateInmuebleRoleDto: UpdateInmuebleRoleDto) {
    return `This action updates a #${id} inmuebleRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} inmuebleRole`;
  }
}
