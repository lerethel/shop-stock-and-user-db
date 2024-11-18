import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { ClassProperties } from "../types/common.types.js";

export class CreateProductDto {
  @IsInt()
  plu!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  constructor(properties: ClassProperties<CreateProductDto>) {
    Object.assign(this, properties);
  }
}
