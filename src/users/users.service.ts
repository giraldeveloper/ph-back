import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { throwError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      Logger.debug(`::: Creating user: ${JSON.stringify(createUserDto)}`);
      const { userName, email, password, nombre, foto, perfil } = createUserDto;

      let user = new User();

      user.username = userName;
      user.email = email;
      user.password = password;
      user.nombre = nombre;
      user.foto = foto;
      user.perfil = perfil;

      user = await this.userRepository.save(user);

      return user;
    } catch (error) {
      return throwError(() => error);
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  async update(id: string, userDto: UpdateUserDto) {
    try {
      Logger.debug(`::: Updating user: ${JSON.stringify(userDto)}`);
      const { userName, email, password, nombre, foto, perfil } = userDto;

      let user = await this.userRepository.findOneBy({ id });

      user.username = userName;
      user.email = email;
      user.password = password;
      user.nombre = nombre;
      user.foto = foto;
      user.perfil = perfil;

      user = await this.userRepository.save(user);

      return user;
    } catch (error) {
      return throwError(() => error);
    }
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
