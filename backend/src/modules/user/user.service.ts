/*
 * @Author: along
 * @Date: 2021-11-02 00:12:55 
 * @Last Modified by: along
 * @Last Modified time: 2021-11-03 01:32:19
 */

import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IResponse } from "src/interface/response.interface";
import { User } from "src/interface/user.interface";
// 定义服务操作数据库
const logger = new Logger('user.service')

@Injectable()
export class UserService {
    private response: IResponse;
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    async userInfo() {
        // return "111"
        return await this.userModel.find().exec();
    }
    /**
     * @description 注册
     * @Date 2021-11-02 00:12:55 
     * @param user 
     * @returns {*}
     */
    async register(user: User) {

        return this.findOneByPhone(user.account)
            .then((res) => {
                if (res && res.length > 0) {
                    // throw Error("用户已注册")
                    this.response = {
                        code: 1,
                        msg: '用户已注册'
                    }
                    throw this.response
                }
            })
            .then(async () => {
                try {
                    const createUser = new this.userModel(user)
                    const resp = await createUser.save()
                    this.response = {
                        code: 0,
                        msg: "注册成功"
                    }
                    return this.response
                } catch (error) {
                    this.response = {
                        code: 2,
                        msg: '用户注册失败，错误详情' + error
                    }
                    throw this.response
                    // throw Error("保存用户失败" + error);
                }
            })
            .catch(err => {
                logger.log(`${user.account}：${err.msg}`)
                return this.response
            })
            .finally(() => {
                // return this.response
            })


    }

    /**
     * @description 获取
     * @Date 2021-11-02 00:12:55 
     * @param user 
     * @returns {*}
     */
    async findOneByPhone(account: string) {
        return await this.userModel.find(
            {
                account: account
            }
        );
    }
}