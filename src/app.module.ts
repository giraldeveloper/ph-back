import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InmuebleModule } from './inmueble/inmueble.module';
import { ConfigModule } from '@nestjs/config';
import { PersonaModule } from './persona/persona.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { ContactoModule } from './contacto/contacto.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

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
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.ENV === 'DEV-DB',
    }),
    CommonModule,
    InmuebleModule,
    PersonaModule,
    VehiculoModule,
    ContactoModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
