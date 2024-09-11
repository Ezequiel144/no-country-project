import { PartialType } from '@nestjs/swagger';
import { CreateAnimalTypesDto } from './create-animaltypes.dto';

export class UpdateAnimalTypesDto extends PartialType(CreateAnimalTypesDto) {}
