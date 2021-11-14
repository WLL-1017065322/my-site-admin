/*
 * @Author: along
 * @Date: 2021-11-02 00:12:55 
 * @Last Modified by: along
 * @Last Modified time: 2021-11-14 20:46:10
 */

import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Articles } from "src/interface/articles.interface";
import * as mongoose from 'mongoose';

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
    async queryDetail(id) {
        try {
            const ObjectId = mongoose.Types.ObjectId;
            const _id = new ObjectId(id)
            const data = await this.articlesModel.findById(_id);
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
    // 查询列表  Types.ObjectId(params._id);
    async queryAll(params) {
        try {
            const ObjectId = mongoose.Types.ObjectId;
            console.log(params._id.trim());
            if (params && params._id.trim() !== '' && !ObjectId.isValid(params._id)) {
                return {
                    code: 1,
                    errMsg: `oid格式不正确`
                }
            }
            if (params && params._id.trim() !== '') {
                params._id = new ObjectId(params._id);
            } else {
                params = {}
            }
            console.log(params, 'params');
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
            console.log('newArticle',newArticle);
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
        const ObjectId = mongoose.Types.ObjectId;
        const _id = new ObjectId(article._id)
        delete article._id;
        try {
            const data = await this.articlesModel.findByIdAndUpdate(_id, article);
            if (data) {
                return {
                    code: 0
                }
            } else {
                return {
                    code: 1,
                    errMsg: '文章更新失败'
                }
            }
        } catch (error) {
            return {
                code: 1,
                errMsg: `文章更新失败: ${error}`
            }
        }
    }
    // 删除
    async delArticle(id) {
        try {
            const ObjectId = mongoose.Types.ObjectId;
            const _id = new ObjectId(id)
            const data = await this.articlesModel.findByIdAndDelete(_id);
            return {
                code: 0
            }
        } catch (error) {
            logger.log(`文章删除失败${error} `)
            return {
                code: 1,
                errMsg: `文章删除失败:${error} `
            }
        }

    }

}