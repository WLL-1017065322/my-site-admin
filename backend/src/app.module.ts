import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './modules/students/students.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { MongooseModule } from "@nestjs/mongoose";
// import { CommonRedisModule } from './common/commonRedis.module';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { Log4jsModule } from "@nestx-log4js/core";
let redisOption = {
  port: 6379,
  host: '127.0.0.1',
  password: '',
  db: 0
}
@Module({
  imports: [
    StudentsModule,
    ArticlesModule,
    DbModule,
    Log4jsModule.forRoot()
    // RedisModule.register(redisOption)
    // CommonRedisModule,
    // RedisModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => configService.get('REDIS') || {},         // or use async method
    //   inject: [ConfigService]
    // }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
