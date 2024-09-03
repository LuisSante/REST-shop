import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Products
  @Get()
  listProducts() {}

  @Get()
  searchByProduct() {}

  @Get()
  detailsByProduct() {}

  // Products management
  @Post()
  createdProduct() {}

  @Put()
  updateProduct() {}

  @Delete()
  deleteProduct() {}

  @Patch()
  disabledProduct() {}

  @Post()
  uploadProduct() {}
}
