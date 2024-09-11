import { ApiProperty } from "@nestjs/swagger";
import { AnimalTypesDto } from "../../animaltype/dto/animaltypes.dto";

export class AnimalShelterDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    profileUrlImage: string;
    
    @ApiProperty()
    observations: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    latitude: number;

    @ApiProperty()
    longitude: number;

    @ApiProperty()
    capacity: number;

    @ApiProperty()
    openingHours: string;

    // Relación many-to-many con AnimalTypes
    @ApiProperty({ type: () => [AnimalTypesDto] }) // Indica que es un array de AnimalTypesDto
    animalTypes: AnimalTypesDto[];
}
