/*
 * @Author: along
 * @Date: 2021-11-02 00:12:55 
 * @Last Modified by: along
 * @Last Modified time: 2021-11-11 00:08:11
 */

import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Articles } from "src/interface/articles.interface";
// 定义服务操作数据库
const logger = new Logger('article.service')

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
            // console.log('res',res)
            if (res && res.length > 0) {
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
    async queryAll(params: Object = {}) {
        try {
            const data = await this.articlesModel.find(params);
            return {
                code: 0,
                data: data,
            }
        } catch (error) {
            logger.log(`文章查询失败${error}`)
            return {
                code: 1,
                errMsg: `文章查询失败:${error}`
            }
        }
    }
    // 新增
    async add(article: Articles) {
        // return "111"
        try {
            const newArticle = new this.articlesModel(article)
            await newArticle.save()
            return {
                code: 0,
                errMsg: '文章新增成功',
            }
        } catch (error) {
            logger.log(`文章新增失败${error}`)
            return {
                code: 1,
                errMsg: `文章新增失败:${error}`
            }
        }

    }
    // 修改
    async put(article: Articles) {
        // return "111"
        return await this.articlesModel.find().exec();
    }
    // 删除
    async del(article: Articles) {
        // return "111"
        return await this.articlesModel.find().exec();
    }

}