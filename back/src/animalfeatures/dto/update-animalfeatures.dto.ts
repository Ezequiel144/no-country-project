import { PartialType } from '@nestjs/swagger';
import { CreateAnimalFeaturesDto } from './create-animalfeatures.dto';

export class UpdateAnimalFeaturesDto extends PartialType(CreateAnimalFeaturesDto) {}
