export class CreateProductDto {
  readonly name: string;
  readonly description?: string; // ใช้ ? เพื่อระบุว่าเป็น optional
  readonly price: number;
}
