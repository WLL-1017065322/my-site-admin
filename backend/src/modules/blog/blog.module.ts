import { Module } from '@nestjs/common';
import { ArticlesModule } from '../articles/articles.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports:[ArticlesModule],
})
export class BlogModule {}
