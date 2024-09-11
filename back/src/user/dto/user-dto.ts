import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { CommonDto } from 'src/common/entities/common.dto';

export class UserDto extends CommonDto{
    @ApiProperty()
    @Exclude()
    username: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    lastName: string;

    @ApiProperty()
    @Expose()
    avatarUrl: string;

    @ApiProperty()
    @Expose()
    firstName: string;

    @Exclude() // Esta propiedad no será expuesta
    password: string;
}

export class UserLogin {
    @IsString()
    @Expose()
    username: string;

    @IsString()
    @Expose()
    password: string;
}
