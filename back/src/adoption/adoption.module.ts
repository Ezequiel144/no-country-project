import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adoption } from './entities/adoption.entity';
import { AdoptionController } from './adoption.controller';
import { AdoptionService } from './adoption.service';

@Module({
  imports: [TypeOrmModule.forFeature([Adoption])],
  controllers: [AdoptionController],
  providers: [AdoptionService],
  exports: [TypeOrmModule]
})
export class AdoptionModule {}
