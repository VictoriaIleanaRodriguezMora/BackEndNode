import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { Product } from 'src/interfaces/product/product.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('price') prodPrice: number,
    @Body('thumbnail') prodThumbnail: string,
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodPrice,
      prodThumbnail,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('price') prodPrice: number,
    @Body('thumbnail') prodThumbnail: string,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodPrice,
      prodThumbnail,
    );
    return 'product updated!';
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
