import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString() // ตรวจสอบว่าเป็น string หรือไม่
  readonly name: string;

  @IsString()
  @IsOptional() // บอกว่าเป็น optional
  readonly description?: string; // ใช้ ? เพื่อระบุว่าเป็น optional

  @IsNumber()
  readonly price: number;
}
