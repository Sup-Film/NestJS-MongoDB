import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// จะไม่ใช้ ProductSchema ตรงนี้เพราะ ProductSchema จะใช้แค่ตอน Register ใน Module เพื่อให้ Mongoose รู้จักกับ Schema ของ Product
import { Product, ProductDocument } from './schemas/product.schema';

// เป็นการ Injext Dependency ของ MongooseModule เพื่อให้สามารถใช้งาน Model ของ Mongoose ได้ โดยไม่ต้องสร้าง instance ด้วยตนเอง
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // เมื่อเราระบุฟังก์ชันนี้เป็น async nestjs จะจัดการ ให้เราโดยอัตโนมัติ
  // โดยจะทำการรอให้ Promise ที่ถูกคืนค่าจาก result.save() เสร็จสิ้นก่อนที่จะส่งค่ากลับ
  // ดังนั้นเราจึงไม่จำเป็นต้องใช้ then/catch ในที่นี้
  // แต่ถ้าเราไม่ระบุ async เราจะต้องใช้ then/catch เพื่อจัดการกับ Promise ที่ถูกคืนค่า
  async create(createProductDto: CreateProductDto): Promise<Product> {
    // สร้าง instance ของ Product โดยใช้ createProductDto ที่ได้รับมา
    // createProductDto จะมีข้อมูลที่จำเป็นสำหรับการสร้าง Product ใหม่
    // จากนั้นใช้ Mongoose Model เพื่อบันทึกข้อมูลลงในฐานข้อมูล
    // result จะเป็น instance ของ Product ที่ถูกบันทึกลงในฐานข้อมูล
    const result = new this.productModel(createProductDto);

    // result.save() จะคืืนค่าเป็น Promise ให้เราทำการระบุฟังก์ชันเป็น async หรือใช้ then/catch เพื่อจัดการกับผลลัพธ์
    return result.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // findById มีโอกาสที่จะคืนค่า null ถ้าไม่พบ Product ที่มี id ตรงกับที่ระบุ
  // ดังนั้นเราจึงระบุ return type เป็น Promise<Product | null>
  // เพื่อให้สามารถจัดการกับกรณีที่ไม่พบ Product ได้
  async findOne(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    const result = this.productModel
      .findByIdAndUpdate(
        id,
        updateProductDto,
        { new: true }, // new: true จะทำให้คืนค่า Product ที่ถูกอัปเดตแล้ว
      )
      .exec();
    return result;
  }

  // ถ้ามีการนำค่าจาก result มาใช้ต่อในโค้ด จะต้องมีการใช้ await เพื่อรอให้ Promise เสร็จสิ้น
  async remove(id: string): Promise<ProductDocument> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Product not found');
    }
    return result;
  }
}
