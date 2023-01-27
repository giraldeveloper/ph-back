import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { ETipoVehiculo, Vehiculo } from './entities/vehiculo.entity';

@Injectable()
export class VehiculoService {

  constructor(
    @InjectRepository(Vehiculo)
    private vehiculoRepository: Repository<Vehiculo>,
  ) { }


  async create(createVehiculoDto: CreateVehiculoDto) {
    const {
      tipoVehiculo,
      placa,
      color
    } = createVehiculoDto;
    
    const eTipoVehiculo: ETipoVehiculo = ETipoVehiculo[this.getKeyByValue(ETipoVehiculo, tipoVehiculo)];
    const vehiculo: Vehiculo = Vehiculo.create();

    vehiculo.tipoVehiculo = eTipoVehiculo
    vehiculo.placa = placa;
    vehiculo.color = color;

    return await this.vehiculoRepository.save(vehiculo);
  }

  findAll(): Promise<Vehiculo[]> {
    return this.vehiculoRepository.find();
  }

  findOne(id: string): Promise<Vehiculo> {
    return this.vehiculoRepository.findOneBy({ id });
  }

  async update(id: string, UpdateVehiculoDto: UpdateVehiculoDto) {
    
    const vehiculo: Vehiculo = await this.findOne(id);

    if (!vehiculo)
      return throwError(() => new HttpException({ message: 'Vehículo no encontrado' }, HttpStatus.NOT_FOUND));
    
    const {
      tipoVehiculo,
      placa,
      color,
      activo
    } = UpdateVehiculoDto;

    const eTipoVehiculo: ETipoVehiculo = ETipoVehiculo[this.getKeyByValue(ETipoVehiculo, tipoVehiculo)];

    vehiculo.tipoVehiculo = eTipoVehiculo
    vehiculo.placa = placa;
    vehiculo.color = color;
    vehiculo.activo = activo;

    return await this.vehiculoRepository.save(vehiculo);
    
  }

  async remove(id: string): Promise<void> {
    await this.vehiculoRepository.delete(id);
  }

  private getKeyByValue<T>(e: T, value: string): string {
    const indexOfFind = Object.values(e).indexOf(value as unknown as T);
    const key = Object.keys(e)[indexOfFind];
    return key;
  }
}