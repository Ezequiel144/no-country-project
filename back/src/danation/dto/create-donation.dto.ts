import { IsNotEmpty, IsOptional, IsString, IsNumber, IsUrl, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CommonDto } from '../../common/entities/common.dto';

export class CreateDonationDto extends CommonDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    amount: number;

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
    idAnimalShelther: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    idUser: number;
}

