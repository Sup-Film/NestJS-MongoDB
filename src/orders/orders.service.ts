import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  // ใช้ InjectModel เพื่อฉีดโมเดล Order เข้าไปใน service นี้
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private productsService: ProductsService, // ใช้ ProductsService เพื่อจัดการกับ Product
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const product = await this.productsService.findOne(
      createOrderDto.productId,
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const createOrder = new this.orderModel(createOrderDto);
    return createOrder.save();
  }

  async findOne(id: string): Promise<Order | null> {
    return this.orderModel.findById(id).populate('productId').exec();
  }
}
