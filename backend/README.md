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

========================
中间件
nest g mi hello

```js
// hello.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HelloMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NestFunction) {
    console.log('req.body',req.body);
    next();
  }
}

// articles.module.ts
export class ArticlesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HelloMiddleware).forRoutes('article')
  }
}

```
yarn add crypto

```js
util/encription.ts
import * as crypto from "crypto"

export function addSalt() {
    return crypto.randomBytes(3).toString("base64")
}
export function encript(userPassword: string, salt: string): string {
    return crypto.pbkdf2Sync(userPassword, salt, 10000, 16, 'sha256').toString('base64')
}

/middlewares/hash-password.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express'
import { addSalt, encript } from 'src/utils/encription';
@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let userPassword = req.body['password'];
    if (userPassword) {
      const salt = addSalt()
      userPassword = encript(userPassword, salt)
      req.body['password'] = userPassword
      req.body['salt'] = salt
      // console.log('req.body',req.body);
    }
    next();
  }
}

```

===================================================
nest g mo auth
nest g service auth
nest g co auth

```js


```


=======================
报错
 Nest can't resolve dependencies of the KeywordsService (?). Please make sure that the argument KeywordsModel at index [0] is available in the KeywordsModule context.

1 @InjectModel('Keywords')是否填错
2 db/db.module/ts 是否加上
    {
        name: 'Keywords', // 需要个schema名称对应
        schema: KeywordsSchema, // 引入的schema
        collection: 'keywords' // 数据库名称
    }
=========================