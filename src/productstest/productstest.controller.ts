import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductstestService } from './productstest.service';

@Controller('productstest')
export class ProductstestController {
  // ประกาศ constructor เพื่อรับ dependency ของ ProductsService เข้ามาใช้
  // NestJS จะทำการ inject instance ของ ProductsService ให้โดยอัตโนมัติ
  // โดยไม่ต้องสร้าง instance ด้วยตนเอง
  constructor(private readonly producttestService: ProductstestService) { }

  @Get()
  getAllProducts() {
    return this.producttestService.findAll();
  }

  @Post()
  addProduct(@Body() product) {
    return this.producttestService.create(product);
  }
}
