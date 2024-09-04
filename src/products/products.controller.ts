import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

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
  @ApiOperation({
    summary: 'Create a product',
    description: 'Create a new product',
  })
  @ApiBody({
    type: CreateProductDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Post()
  createdProduct(@Body() product: CreateProductDto) {
    return this.productsService.createdProduct(product);
  }

  @Put()
  updateProduct() {}

  @Delete()
  deleteProduct() {}

  @Patch()
  disabledProduct() {}

  @Post()
  uploadProduct() {}
}
