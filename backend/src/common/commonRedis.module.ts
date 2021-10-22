import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
// redis
import { RedisModule } from "nestjs-redis";
// import { CommonRedisService } from "src/common/commonRedis.service";

// import redisOption from "src/config/redisConfig"

// 在使用的控制器对应的Module中配置Model

let redisOption = {
    port: 6379,
    host: '127.0.0.1',
    password: '',
    db: 0
}

@Module({
    // providers: [CommonRedisService],
    // exports: [CommonRedisService],
    // imports: [
    //     // redis注册
    //     RedisModule.register(redisOption),
    //     // RedisModule.forRootAsync({
    //     //     imports: [ConfigModule],
    //     //     useFactory: (configService: ConfigService) => configService.get('REDIS') || {},         // or use async method
    //     //     inject: [ConfigService]
    //     //   }),
    // ],
})
export class CommonRedisModule { }
