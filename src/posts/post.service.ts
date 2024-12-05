import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPosts(skip: number, take: number): Promise<Post[]> {
    console.log(this.prisma.post.findMany({
      skip,
      take,
    }));
    return this.prisma.post.findMany({
      skip,
      take,
    });
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async createPost(createPostDto: CreatePostDto, imageUrl: string): Promise<Post> {
    const { title, content } = createPostDto;
    return this.prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
      },
    });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto, imageUrl?: string): Promise<Post> {
    const existingPost = await this.prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        ...(imageUrl && { imageUrl }),
      },
    });
  }

  async deletePost(id: number) {
    const existingPost = await this.prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return this.prisma.post.delete({ where: { id } });
  }
}
