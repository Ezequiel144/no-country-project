import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { CommonDto } from "src/common/entities/common.dto";
import { AnimalDto } from "../../animal/dto/animal.dto";

export class ReportStateDto extends CommonDto {
    @ApiProperty()
    @Expose()
    name: string
}

export class ReportStateAnimalDTO extends CommonDto {
    @ApiProperty()
    @Expose()
    name: string

    // Relación con Animal
    animals: AnimalDto[];
}