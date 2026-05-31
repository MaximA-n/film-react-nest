//TODO описать DTO для запросов к /films
import { IsString, IsNumber, IsArray, IsUUID, Min, Max } from 'class-validator';

export class ScheduleDto {
  @IsUUID()
  id: string;

  @IsString()
  daytime: string;

  @IsString()
  hall: string;

  @IsNumber()
  @Min(1)
  rows: number;

  @IsNumber()
  @Min(1)
  seats: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsArray()
  @IsString({ each: true })
  taken: string[];
}

export class FilmDto {
  @IsUUID()
  id: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  cover: string;
}