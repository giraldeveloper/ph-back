import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { VehiculoDto } from './dto/vehiculo.dto';
import { Vehiculo } from './entities/vehiculo.entity';
import { ETipoVehiculo } from 'src/common/enums/ETipoVehiculo';
import { getKeyByValue } from 'src/common/enums/utils';

@Injectable()
export class VehiculoService {

  constructor(
    @InjectRepository(Vehiculo)
    private vehiculoRepository: Repository<Vehiculo>,
  ) { }


  async create(createVehiculoDto: VehiculoDto) {
    const {
      tipoVehiculo,
      placa,
      color,
      activo, 
      inmuebleId
    } = createVehiculoDto;

    const eTipoVehiculo: ETipoVehiculo = ETipoVehiculo[getKeyByValue(ETipoVehiculo, tipoVehiculo)];

    let vehiculo = await this.findByPlaca(placa);
    if (!vehiculo) vehiculo = new Vehiculo();

    vehiculo.tipoVehiculo = eTipoVehiculo
    vehiculo.placa = placa;
    vehiculo.color = color;
    vehiculo.inmuebleId = inmuebleId;

    if (typeof activo !== undefined)
      vehiculo.activo = activo

    return await this.vehiculoRepository.save(vehiculo);
  }

  findAll(): Promise<Vehiculo[]> {
    return this.vehiculoRepository.find();
  }

  findOne(id: string): Promise<Vehiculo> {
    return this.vehiculoRepository.findOneBy({ id });
  }

  async findByPlaca(placa: string): Promise<Vehiculo | undefined> {
    return await this.vehiculoRepository.findOneBy({ placa });
  }

  async update(id: string, UpdateVehiculoDto: VehiculoDto) {

    const vehiculo: Vehiculo = await this.findOne(id);

    if (!vehiculo)
      return throwError(() => new HttpException({ message: 'Vehículo no encontrado' }, HttpStatus.UNPROCESSABLE_ENTITY));

    const {
      tipoVehiculo,
      placa,
      color,
      activo,
      inmuebleId
    } = UpdateVehiculoDto;

    const eTipoVehiculo: ETipoVehiculo = ETipoVehiculo[getKeyByValue(ETipoVehiculo, tipoVehiculo)];

    vehiculo.tipoVehiculo = eTipoVehiculo
    vehiculo.placa = placa;
    vehiculo.color = color;
    vehiculo.activo = activo;
    vehiculo.inmuebleId = inmuebleId;

    return await this.vehiculoRepository.save(vehiculo);

  }

  async remove(id: string): Promise<void> {
    await this.vehiculoRepository.delete(id);
  }

}
