import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
// 定义服务操作数据库


@Injectable()
export class StudentsService {
    constructor(@InjectModel('Students') private readonly studentsModel) { }
    async studentsInfo() {
        // return "111"
        return await this.studentsModel.find().exec();
    }
}