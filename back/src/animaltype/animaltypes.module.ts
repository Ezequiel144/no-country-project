import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTypes } from './entities/animaltypes.entity';
import { AnimalTypesController } from './animaltypes.controller';
import { AnimalTypesService } from './animaltypes.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalTypes])],
  controllers: [AnimalTypesController],
  providers: [AnimalTypesService],
  exports:[TypeOrmModule]
})
export class AnimalTypesModule {}
