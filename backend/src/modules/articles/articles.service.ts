/*
 * @Author: along
 * @Date: 2021-11-02 00:12:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-11-02 00:40:44
 */

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Articles } from "src/interface/articles.interface";
// 定义服务操作数据库


@Injectable()
export class ArticlesService {
    constructor(@InjectModel('Articles') private readonly articlesModel: Model<Articles>) { }
    async articlesInfo() {
        // return "111"
        return await this.articlesModel.find().exec();
    }
    /**
     * @description 获取文章
     * @Date 2021-11-02 00:12:55 
     * @param article 
     * @returns {*}
     */
    async queryDetail(article: Articles) {
        // return "111"
        try {
            const res = await this.articlesModel.find(
                {
                    content: article.content
                }
            );
            console.log('res',res)
            if (res&&res.length > 0) {
                console.log('已注册');
                throw Error("用户已注册")

            } else {
                const createUser = new this.articlesModel(article)
                return createUser.save()
            }
        } catch (error) {
            throw Error("保存用户失败" + error);
        }

    }
    // 查询列表
    async queryAll() {
        // return "111"
        return await this.articlesModel.find().exec();
    }
    // 新增
    async add() {
        // return "111"
        return await this.articlesModel.find().exec();
    }
    // 修改
    async put() {
        // return "111"
        return await this.articlesModel.find().exec();
    }
    // 删除
    async del() {
        // return "111"
        return await this.articlesModel.find().exec();
    }

}