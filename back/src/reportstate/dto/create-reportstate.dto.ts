import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateReportStateDto {
    @ApiProperty()
    @IsString()
    name: string
}
