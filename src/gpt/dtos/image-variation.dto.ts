import { IsInt, IsOptional, IsString } from "class-validator";

export class ImageVariationDto {
    @IsString()
    readonly baseImage: string;
}