import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InmuebleModule } from './inmueble/inmueble.module';
import { ConfigModule } from '@nestjs/config';
import { PersonaModule } from './persona/persona.module';
import { InmuebleRoleModule } from './inmueble-role/inmueble-role.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT) || 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: process.env.MYSQL_DATABASE || 'test',
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}'
      ],
      synchronize: true,
    }),
    CommonModule,
    InmuebleModule,
    PersonaModule,
    InmuebleRoleModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
