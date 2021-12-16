import { Module } from '@nestjs/common';
import { ArticlesModule } from '../articles/articles.module';
import { InfoModule } from '../info/info.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [ArticlesModule, InfoModule],
})
export class BlogModule { }
