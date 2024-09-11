import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Animal } from '../../animal/entities/animal.entity';
import { User } from '../../user/entities/user.entity';
import { CommonDto } from '../../common/entities/common.dto';
import { AdoptionStatus } from '../entities/adoption.entity';

export class AdoptionDto extends CommonDto{
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

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Animal)
    idAnimal: Animal;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => User)
    idUser: User;
}

