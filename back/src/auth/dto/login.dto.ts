import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsString, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    username: string;
    
    @ApiProperty()
    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    password: string;
}