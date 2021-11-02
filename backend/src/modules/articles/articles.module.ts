import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticlesSchema } from "src/db/schema/articles.schema";
import { ArticlesService } from "./articles.service";
import { ArticlesController } from "./articles.controller";


// 在使用的控制器对应的Module中配置Model

@Module({
  imports: [
    // MongooseModule.forFeature([{
    //   name: 'Articles', // 需要个schema名称对应
    //   schema: ArticlesSchema, // 引入的schema
    //   collection: 'articles' // 数据库名称
    // }
    // ]),
    // redis注册
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule { }
