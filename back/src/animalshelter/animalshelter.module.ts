import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalShelter } from './entities/animalshelter.entity';
import { AnimalShelterController } from './animalshelter.controller';
import { AnimalShelterService } from './animalshelter.service';
import { AnimalTypesModule } from '../animaltype/animaltypes.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalShelter]),
  AnimalTypesModule],
  controllers: [AnimalShelterController],
  providers: [AnimalShelterService],
  exports:[TypeOrmModule]
})
export class AnimalShelterModule {}
