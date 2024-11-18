import { IsDateString, IsInt, IsOptional, ValidateIf } from "class-validator";
import { ClassProperties } from "../types/common.types.js";

export class CreateStockDto {
  @IsInt()
  product!: number;

  @IsInt()
  itemsAvailable!: number;

  @IsInt()
  itemsOrdered!: number;

  @IsInt()
  shop!: number;

  @IsOptional()
  @IsDateString()
  date?: string;

  constructor(properties: ClassProperties<CreateStockDto>) {
    Object.assign(this, properties);
  }
}

export class ChangeStockDto {
  @IsInt()
  @ValidateIf(({ decrease }) => decrease == null)
  increase?: number;

  @IsInt()
  @ValidateIf(({ increase }) => increase == null)
  decrease?: number;

  constructor(properties: ClassProperties<ChangeStockDto>) {
    Object.assign(this, properties);
  }
}
