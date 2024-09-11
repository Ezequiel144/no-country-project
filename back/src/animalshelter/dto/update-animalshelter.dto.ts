import { PartialType } from '@nestjs/swagger';
import { CreateAnimalShelterDto } from './create-animalshelter.dto';

export class UpdateAnimalShelterDto extends PartialType(CreateAnimalShelterDto) {}
