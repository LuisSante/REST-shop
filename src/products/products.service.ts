import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  createdProduct(product: CreateProductDto) {
    const payload: Prisma.ProductCreateInput = {
      ...product,
    };
    return this.prismaService.product.create({
      data: payload,
      include: { images: true },
    });
  }
}
