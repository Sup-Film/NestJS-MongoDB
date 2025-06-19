import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Product & Document เป็นการรวมกันของ Product schema และ Base Structure ของ Mongoose Document เพื่อให้แน่ใจว่า ProductDocument จะมีคุณสมบัติและเมธอดที่จำเป็นสำหรับการทำงานกับ Mongoose
export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);