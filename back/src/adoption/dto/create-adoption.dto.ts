import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CommonDto } from '../../common/entities/common.dto';
import { AdoptionStatus } from '../../adoption/entities/adoption.entity';

export class CreateAdoptionDto extends CommonDto {
    @ApiProperty({ description: 'Estado de la adopción', enum: AdoptionStatus })
    @IsNotEmpty()
    @IsEnum(AdoptionStatus)
    status: AdoptionStatus;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    voucher: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    observations?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    idAnimal: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    idUser: number;
}
