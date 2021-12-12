import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { KeywordsModule } from '../keywords/keywords.module';
import { TagsModule } from '../tags/tags.module';
import { UserModule } from '../user/user.module';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  imports: [KeywordsModule, TagsModule, UserModule, ArticlesModule],
  providers: [InfoService],
  controllers: [InfoController]
})
export class InfoModule { }
