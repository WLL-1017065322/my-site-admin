yarn global add @nestjs/cli
nest new backend
安装swagger
yarn add --save @nestjs/swagger swagger-ui-express
```js
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const app = await NestFactory.create(AppModule);
const options = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
```
添加注解
```js
@Get()
@ApiTags('index')
```
localhost:3000/api/

adminMongo管理Mongo数据库

=========================================================================

连接mongo
yarn add --save mongoose
yarn add  --save-dev @types/mongoose

nest g mo db

1 nestjs官网
2
```js
// db
// - db.module.ts
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesSchema } from './schema/articles.schema';
import { StudentsSchema } from './schema/students.schema';
const MONGO_MODELS = MongooseModule.forFeature([
    {
        name: 'Articles', // 需要个schema名称对应
        schema: ArticlesSchema, // 引入的schema
        collection: 'articles' // 数据库名称
    },
])
@Global()
@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/blog-admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        }),
        MONGO_MODELS
    ],
    exports: [MONGO_MODELS]
})
export class DbModule { }

// - schemal
// -- articles.schema.ts
import { SchemaFactory } from "@nestjs/mongoose";
import { Articles } from "src/interface/articles.interface";
export const ArticlesSchema = SchemaFactory.createForClass(Articles)
interface

// interface
// - articles.interface.ts
import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Articles extends Document {
    @Prop()
    @ApiProperty({
        description: "内容",
        example: '11111'
    })
    readonly content: String;
    @Prop()
    @ApiProperty({
        description: "标题",
        example: '2222'
    })
    readonly title: String;
    readonly subhead: String;
    readonly tags: String;
    readonly author: String;
    readonly date: String;
    readonly time: String;
    readonly keywords: String;
    readonly type: String;
    readonly pageView: String;
    readonly image: String;
    readonly comment: String;
}
```

=======================================

1 nest自带的logger
```js
import { Logger } from '@nestjs/common';
const logger = new Logger("main.ts");
logger.log(`nest start at ${serverPort}`)
app.useLogger(app.get(Log4jsLogger))


```
2 yarn add @nestx-log4js/core
```js
app.module.ts
import { Log4jsModule } from "@nestx-log4js/core";
@Module({
  imports: [
    Log4jsModule.forRoot()
  ],})
main.ts
app.useLogger(app.get(Log4jsLogger))
```