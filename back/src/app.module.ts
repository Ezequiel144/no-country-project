import { ServeStaticModule } from '@nestjs/serve-static';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RedirectMiddleware } from './redirect.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

// Aplicacion App
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Origen de Datos
import { dataSourceOptions } from "./db/data-source";

// Guards
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';

// Modulos
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.modules';
import { AuthModule } from './auth/auth.module';
import { AnimalModule } from './animal/animal.module';
import { AnimalShelterModule } from './animalshelter/animalshelter.module';
import { AnimalTypesModule } from './animaltype/animaltypes.module';
import { ReportStateModule } from './reportstate/reportstate.module';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, 'html'),
        serveRoot: '/html',
      },
      {
        rootPath: join(__dirname, '..', 'uploads'),
        serveRoot: '/uploads' // Ruta del directorio de carga de las imágenes
      },
    ),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UserModule,
    AnimalModule,
    AnimalShelterModule,
    AnimalTypesModule,
    FilesModule,
    ReportStateModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: RolesGuard, },
  ],
  exports: [TypeOrmModule]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RedirectMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.ALL }); // Aplica el middleware a todas las rutas
  }
}
