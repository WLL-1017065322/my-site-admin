import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './modules/students/students.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { MongooseModule } from "@nestjs/mongoose";
// import { CommonRedisModule } from './common/commonRedis.module';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { Log4jsModule } from "@nestx-log4js/core";
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { BatchModule } from './modules/batch/batch.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { KeywordsModule } from './modules/keywords/keywords.module';
import { TagsModule } from './modules/tags/tags.module';
import { InfoModule } from './modules/info/info.module';
import { BlogModule } from './modules/blog/blog.module';
import { TypesController } from './modules/types/types.controller';
import { TypesService } from './modules/types/types.service';
import { TypesModule } from './modules/types/types.module';
// let redisOption:RedisModuleOptions = {
//   port: 6379,
//   name: 'management',
//   host: '127.0.0.1',
//   password: '',
//   db: 0
// }
@Module({
  imports: [
    StudentsModule,
    ArticlesModule,
    UserModule,
    DbModule,
    Log4jsModule.forRoot(),
    AuthModule,
    BatchModule,
    // RedisModule.register(redisOption)
    // CommonRedisModule,
    // RedisModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => configService.get('REDIS') || {},         // or use async method
    //   inject: [ConfigService]
    // }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    KeywordsModule,
    TagsModule,
    InfoModule,
    BlogModule,
    TypesModule,
  ],

  controllers: [AppController, TypesController],
  providers: [AppService, TypesService],
})
export class AppModule { }
