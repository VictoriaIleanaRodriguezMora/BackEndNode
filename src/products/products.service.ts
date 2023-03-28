import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/interfaces/product/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly ProductModel: Model<Product>,
  ) {}

  async insertProduct(title: string, price: number, thumbnail: string) {
    const newProduct = new this.ProductModel({
      title: title,
      price: price,
      thumbnail: thumbnail,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.ProductModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      thumbnail: prod.thumbnail,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    price: number,
    thumbnail: string,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (thumbnail) {
      updatedProduct.thumbnail = thumbnail;
    }
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.ProductModel.deleteOne({ _id: prodId }).exec();
    console.log(result);
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.ProductModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find product');
    }
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return product;
  }
}
