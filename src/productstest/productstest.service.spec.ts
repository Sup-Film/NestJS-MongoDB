import { Test, TestingModule } from '@nestjs/testing';
import { ProductstestService } from './productstest.service';

describe('ProductstestService', () => {
  let service: ProductstestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductstestService],
    }).compile();

    service = module.get<ProductstestService>(ProductstestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
