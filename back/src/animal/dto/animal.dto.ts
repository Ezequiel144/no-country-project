import { IsNotEmpty, IsOptional, IsString, IsNumber, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { AnimalShelter } from '../../animalshelter/entities/animalshelter.entity';
import { AnimalTypes } from '../../animaltype/entities/animaltypes.entity';
import { AnimalFeatures } from '../../animalfeatures/entities/animalfeatures.entity';

export class AnimalDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsUrl()
    profileUrlImage?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    age?: number;

    @IsOptional()
    @IsString()
    observations?: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => AnimalShelter)
    idAnimalShelther: AnimalShelter;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => AnimalTypes)
    idAnimalTypes: AnimalTypes;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => AnimalFeatures)
    idAnimalFeatures: AnimalFeatures;
}

