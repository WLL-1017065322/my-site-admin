/*
 * @Author: along
 * @Date: 2021-11-02 00:12:55 
 * @Last Modified by: along
 * @Last Modified time: 2021-11-16 23:37:10
 */

import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RedisService } from "nestjs-redis";
import { IResponse } from "src/interface/response.interface";
import { User } from "src/interface/user.interface";
import { Redis } from 'ioredis';
// 定义服务操作数据库
const logger = new Logger('user.service')

@Injectable()
export class UserService {
    private response: IResponse;
    private redis: Redis;
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        // private readonly redisService: RedisService
    ) {
        // this.redis = this.redisService.getClient('management')
    }
    async userInfo() {
        // return "111"
        return await this.userModel.find().exec();
    }


    /**
     * @description 获取
     * @Date 2021-11-02 00:12:55 
     * @param user 
     * @returns {*}
     */
    async findOneByAccount(account: string) {
        return await this.userModel.find(
            {
                account: account
            }
        );
    }

    // public async helloRedis() {
    //     return this.redis.set("management", 'helloworld')
    // }
}