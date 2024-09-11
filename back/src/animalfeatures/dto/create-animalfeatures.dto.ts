import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateAnimalFeaturesDto {
    @ApiProperty()
    @IsString()
    name: string
}
