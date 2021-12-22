import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesSchema } from './schema/articles.schema';
import { KeywordsSchema } from './schema/keywords.schema';
import { StudentsSchema } from './schema/students.schema';
import { SystemInfoSchemal } from './schema/systemInfo';
import { TagsSchema } from './schema/tags.schema';
import { TypesSchema } from './schema/types.schema';
import { UserSchema } from './schema/user.schema';

const MONGO_MODELS = MongooseModule.forFeature([
    {
        name: 'Articles', // 需要个schema名称对应
        schema: ArticlesSchema, // 引入的schema
        collection: 'articles' // 数据库名称
    },
    {
        name: 'Students', // 需要个schema名称对应
        schema: StudentsSchema, // 引入的schema
        collection: 'students' // 数据库名称
    },
    {
        name: 'User', // 需要个schema名称对应
        schema: UserSchema, // 引入的schema
        collection: 'user' // 数据库名称
    },
    {
        name: 'Keywords', // 需要个schema名称对应
        schema: KeywordsSchema, // 引入的schema
        collection: 'keywords' // 数据库名称
    },
    {
        name: 'Tags', // 需要个schema名称对应
        schema: TagsSchema, // 引入的schema
        collection: 'tags' // 数据库名称
    },
    {
        name: 'SystemInfo', // 需要个schema名称对应
        schema: SystemInfoSchemal, // 引入的schema
        collection: 'systemInfo' // 数据库名称
    },
    {
        name: 'Types', // 需要个schema名称对应
        schema: TypesSchema, // 引入的schema
        collection: 'types' // 数据库名称
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
