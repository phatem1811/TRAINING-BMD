import { IsString, IsNotEmpty, IsOptional } from "class-validator";
export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty({ message: "name is required" })
  name!: string;
}

export class UpdateCategoryDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: "name is required" })
  name!: string;
}
