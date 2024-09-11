import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @Length(6,15)
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    userState?: boolean;

    @ApiProperty()
    @IsBoolean()
    updatePassword?: boolean;

    @ApiProperty({ nullable: true })
    @IsString()
    avatarUrl?: string;

    @ApiProperty()
    @IsString()
    profileUrl?: string;

    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    birthday?: Date;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    zipCode?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({example: 'user@email.com'})
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    observations: string;

}
