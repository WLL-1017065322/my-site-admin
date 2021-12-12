import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';

@Module({
  providers: [KeywordsService],
  controllers: [KeywordsController],
  exports: [KeywordsService],
})
export class KeywordsModule { }
