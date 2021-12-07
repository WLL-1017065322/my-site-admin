import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { BatchController } from './batch.controller';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  // imports: [ArticlesModule],
  providers: [BatchService],
  controllers: [BatchController],
})
export class BatchModule { }
