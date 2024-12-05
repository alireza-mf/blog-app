import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PostService } from './post.service';
import { FileUploadService } from 'src/utils/file-upload';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
@UseGuards(AuthGuard, RolesGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Post()
  @Roles('author')
  @UseInterceptors(FileInterceptor('image', new FileUploadService().getMulterOptions()))
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = `/public/uploads/${file.filename}`;
    return this.postService.createPost(createPostDto, imageUrl);
  }

  @Put(':id')
  @Roles('author')
  @UseInterceptors(FileInterceptor('image', new FileUploadService().getMulterOptions()))
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const imageUrl = file ? `/public/uploads/${file.filename}` : undefined;
    return this.postService.updatePost(id, updatePostDto, imageUrl);
  }
  
  @Get()
  async getAllPosts(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const skip = (page - 1) * limit;
    return this.postService.getAllPosts(skip, limit);
  }

  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }
  
  @Delete(':id')
  @Roles('author')
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }
}