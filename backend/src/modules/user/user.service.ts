/*
 * @Author: along
 * @Date: 2021-11-02 00:12:55 
 * @Last Modified by: along
 * @Last Modified time: 2021-11-22 23:50:29
 */

import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RedisService } from "nestjs-redis";
import { IResponse } from "src/interface/response.interface";
import { User } from "src/interface/user.interface";
import { Redis } from 'ioredis';
import { ObjectId } from "mongodb";
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
    /**
     * @description 获取用户列表
     * @Date 2021-11-02 00:12:55 
     * @param user 
     * @returns {*}
     */
    async queryAll(id: string) {
        try {
            let params = {};
            if (id) {
                params['_id'] = new ObjectId(id);
            }
            const data = await this.userModel.find(params)
            return {
                code: 0,
                data: data
            }
        } catch (error) {
            console.log(error);
            return {
                code: 1,
                errMsg: error
            }
        }
    }

    /**
     * @description 新增用户
     * @Date 2021-11-02 00:12:55 
     * @param user 
     * @returns {*}
     */
    async addUser(user) {
        try {
            delete user._id
            const newUser = new this.userModel(user);
            await newUser.save();
            return {
                code: 0,
                data: '用户新增成功'
            }
        } catch (error) {
            console.log(error);
            return {
                code: 1,
                errMsg: error
            }
        }
    }

    /**
    * @description 修改用户
    * @Date 2021-11-02 00:12:55 
    * @param user 
    * @returns {*}
    */
    async putUser(user) {
        console.log('user', user);
        try {
            // const newUser = new this.userModel(user);
            // await newUser.save();
            let params = { ...user };
            delete params._id;
            const data = await this.userModel.findByIdAndUpdate({ _id: user._id }, params)
            return {
                code: 0,
                data: '用户修改成功'
            }
        } catch (error) {
            console.log(error);
            return {
                code: 1,
                errMsg: error
            }
        }
    }

    /**
    * @description 删除用户
    * @Date 2021-11-02 00:12:55 
    * @param user 
    * @returns {*}
    */
    async delUser(id) {
        console.log('user', id);
        try {
            const _id = new ObjectId(id)
            const data = await this.userModel.findByIdAndDelete(_id);
            return {
                code: 0,
                data: '用户删除成功'
            }
        } catch (error) {
            console.log(error);
            return {
                code: 1,
                errMsg: error
            }
        }
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

}