import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PostModule } from './posts/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { FirebaseAdminModule } from './auth/auth.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..",'public'),
      serveStaticOptions:{
        index: false,
      }
    }),
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true,
    }),
    FirebaseAdminModule,
    PostModule,
    PrismaModule,
  ],
  providers: [
  ],
})
export class AppModule {}