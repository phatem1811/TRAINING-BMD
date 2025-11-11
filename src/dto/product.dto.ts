import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({ message: "name is required" })
  name!: string;

  @IsNumber({}, { message: "price must be a number" })
  @IsNotEmpty({ message: "price is required" })
  price!: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: "categoryId must be a number" })
  @IsNotEmpty({ message: "categoryId is required" })
  categoryId!: number;
}

export class UpdatProductDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: "name cannot be empty" })
  name?: string;

  @IsNumber({}, { message: "price must be a number" })
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: "categoryId must be a number" })
  @IsOptional()
  categoryId?: number;
}

