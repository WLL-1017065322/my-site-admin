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
}