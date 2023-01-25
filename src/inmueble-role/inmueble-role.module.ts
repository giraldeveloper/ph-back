import { Module } from '@nestjs/common';
import { InmuebleRoleService } from './inmueble-role.service';
import { InmuebleRoleController } from './inmueble-role.controller';

@Module({
  controllers: [InmuebleRoleController],
  providers: [InmuebleRoleService]
})
export class InmuebleRoleModule {}
