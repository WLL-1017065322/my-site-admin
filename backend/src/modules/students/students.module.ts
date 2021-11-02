import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentsSchema } from "src/db/schema/students.schema";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";


// 在使用的控制器对应的Module中配置Model

@Module({
  imports: [
    // MongooseModule.forFeature([{
    //   name: 'Students', // 需要个schema名称对应
    //   schema: StudentsSchema, // 引入的schema
    //   collection: 'students' // 数据库名称
    // }
    // ]),
    // redis注册
  ],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule { }
