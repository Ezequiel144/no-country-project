import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNumber, IsString } from "class-validator"

export class CreateAnimalShelterDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    profileUrlImage: string;
    
    @ApiProperty()
    @IsString()
    observations: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNumber()
    latitude: number;

    @ApiProperty()
    @IsNumber()
    longitude: number;

    @ApiProperty()
    @IsNumber()
    capacity: number;

    @ApiProperty()
    @IsString()
    openingHours: string;

    @ApiProperty()
    @IsNumber()
    idAnimalType: number
}
