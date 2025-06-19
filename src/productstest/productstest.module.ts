import { Module } from '@nestjs/common';
import { ProductstestService } from './productstest.service';
import { ProductstestController } from './productstest.controller';

@Module({
  controllers: [ProductstestController],
  providers: [ProductstestService],
})
export class ProductstestModule {}
