import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FileUploadService } from '../utils/file-upload';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService, FileUploadService],
  exports: [PostService],
})
export class PostModule {}
