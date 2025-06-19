import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductstestService {
  private readonly products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ];

  findAll() {
    // อยู่ใน Class เดียวกันการเรียกใช้ต้องใส่ this.
    return this.products;
  }

  create(product) {
    // รับข้อมูล product ที่ส่งมาจาก Controller
    // นำ product ที่ได้มาต่อกับข้อมูลเดิมที่มีอยู่ใน products
    this.products.push(product);
    return this.products;
  }
}
