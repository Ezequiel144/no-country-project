import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { CommonDto } from "src/common/entities/common.dto";
import { AnimalDto } from "../../animal/dto/animal.dto";

export class AnimalTypesDto extends CommonDto {
    @ApiProperty()
    @Expose()
    name: string
}

export class AnimalTypesAnimalDTO extends CommonDto {
    @ApiProperty()
    @Expose()
    name: string

    // Relación con Animal
    animals: AnimalDto[];
}