import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AnimalShelter } from '../../animalshelter/entities/animalshelter.entity';
import { User } from '../../user/entities/user.entity';
import { CommonDto } from '../../common/entities/common.dto';

export class DonationDto extends CommonDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    amount: number;

    @ApiProperty({ description: 'Posible comprobante asociado'})
    @IsNotEmpty()
    @IsString()
    voucher: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    observations?: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => AnimalShelter)
    idAnimalShelther: AnimalShelter;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => User)
    idUser: User;
}

