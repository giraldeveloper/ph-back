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
  ) {}

  async create(createVehiculoDto: VehiculoDto) {
    try {
      let vehiculo = await this.findByPlaca(createVehiculoDto.placa);
      vehiculo = this.perseVehiculoDtoToVehiculoEntity(
        createVehiculoDto,
        vehiculo,
      );
      return await this.vehiculoRepository.save(vehiculo);
    } catch (error) {
      return throwError(() => error);
    }
  }

  findAll(): Promise<Vehiculo[]> {
    return this.vehiculoRepository.find();
  }

  findOne(id: string): Promise<Vehiculo> {
    return this.vehiculoRepository.findOneBy({ id });
  }

  async findByPlaca(placa: string): Promise<Vehiculo | undefined> {
    return await this.vehiculoRepository.findOneBy({
      placa: this.cleanPlaca(placa),
    });
  }

  async findByInmueble(inmueble: string): Promise<Vehiculo[] | undefined> {
    return await this.vehiculoRepository.findBy({
      inmuebleId: inmueble,
    });
  }

  async update(id: string, updateVehiculoDto: VehiculoDto) {
    let vehiculo: Vehiculo = await this.findOne(id);

    if (!vehiculo)
      return throwError(
        () =>
          new HttpException(
            { message: 'Vehículo no encontrado' },
            HttpStatus.UNPROCESSABLE_ENTITY,
          ),
      );

    vehiculo = this.perseVehiculoDtoToVehiculoEntity(
      updateVehiculoDto,
      vehiculo,
    );

    return await this.vehiculoRepository.save(vehiculo);
  }

  async remove(id: string): Promise<void> {
    await this.vehiculoRepository.delete(id);
  }

  cleanPlaca(placa: string): string {
    return placa.toUpperCase().replace(/[^\w\d]/gi, '');
  }

  perseVehiculoDtoToVehiculoEntity(
    createVehiculoDto: VehiculoDto,
    vehiculo: Vehiculo = undefined,
  ): Vehiculo {
    const { tipoVehiculo, placa, color, activo, inmuebleId } =
      createVehiculoDto;

    const eTipoVehiculo: ETipoVehiculo =
      ETipoVehiculo[getKeyByValue(ETipoVehiculo, tipoVehiculo)];

    if (!vehiculo) vehiculo = new Vehiculo();

    vehiculo.tipoVehiculo = eTipoVehiculo;
    vehiculo.placa = this.cleanPlaca(placa);
    vehiculo.color = color;
    vehiculo.inmuebleId = inmuebleId;
    vehiculo.activo = typeof activo !== undefined ? activo : true;

    return vehiculo;
  }
}
