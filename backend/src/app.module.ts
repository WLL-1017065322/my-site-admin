import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './modules/students/students.module';
import { MongooseModule } from "@nestjs/mongoose";
// import { CommonRedisModule } from './common/commonRedis.module';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
let redisOption = {
  port: 6379,
  host: '127.0.0.1',
  password: '',
  db: 0
}
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/students', { useNewUrlParser: true }), StudentsModule,
    RedisModule.register(redisOption)
    // CommonRedisModule,
    // RedisModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => configService.get('REDIS') || {},         // or use async method
    //   inject: [ConfigService]
    // }),
  ],

  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }
