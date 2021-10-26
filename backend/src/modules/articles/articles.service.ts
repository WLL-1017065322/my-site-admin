import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
// 定义服务操作数据库


@Injectable()
export class ArticlesService {
    constructor(@InjectModel('Articles') private readonly articlesModel) { }
    async articlesInfo() {
        // return "111"
        return await this.articlesModel.find().exec();
    }
    // 查询详情
    async queryDetail() {
        // return "111"
        return await this.articlesModel.find().exec();
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