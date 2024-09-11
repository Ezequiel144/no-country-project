import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { CommonDto } from "src/common/entities/common.dto";
import { AnimalTypesDto } from "../../animaltype/dto/animaltypes.dto";

export class AnimalFeaturesDto extends CommonDto {
    @ApiProperty()
    @Expose()
    name: string
}

export class AnimalFeaturesAnimalTypesDTO extends CommonDto {
    @ApiProperty()
    @Expose()
    name: string

    // Relación con Animal Types
    animaltypes: AnimalTypesDto[];
}