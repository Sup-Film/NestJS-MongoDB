import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    // .forFeature เป็นคำสั่งที่จะ Import model ทำการ Register เข้าไปใน MongooseModule เพื่อให้ Dependency ของ NestJS รู้จักและสามารถใช้งานได้
    // Product.name ไม่ได้หมายถึง Property ของ Product แต่เป็นชื่อของ Mongoose Model ที่เราต้องการสร้าง
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
