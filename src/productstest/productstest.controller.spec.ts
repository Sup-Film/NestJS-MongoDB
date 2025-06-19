import { Test, TestingModule } from '@nestjs/testing';
import { ProductstestController } from './productstest.controller';

describe('ProductstestController', () => {
  let controller: ProductstestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductstestController],
    }).compile();

    controller = module.get<ProductstestController>(ProductstestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
