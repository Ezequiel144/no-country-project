import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalFeatures } from './entities/animalfeatures.entity';
import { AnimalFeaturesController } from './animalfeatures.controller';
import { AnimalFeaturesService } from './animalfeatures.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalFeatures])],
  controllers: [AnimalFeaturesController],
  providers: [AnimalFeaturesService],
  exports:[TypeOrmModule]
})
export class AnimalFeaturesModule {}
