import { Body, Controller, Get, Post, } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Articles } from "src/interface/articles.interface";
import { ArticlesService } from "./articles.service";
// import { CommonRedisService } from "src/common/commonRedis.service";

// 在对应的控制器中调用服务

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {
    }

    @Get()
    index() {
        console.log(111);
        return this.articlesService.articlesInfo()
    }

    @Post()
    @ApiOperation({
        summary: "获取文章"
    })
    async getArticle(@Body() articleDto: Articles) {
        return await this.articlesService.queryDetail(articleDto)
        // return this.articlesService.articlesInfo()
    }


    // @Get('setredis')
    // async setRedis() {
    //     await this.commonRedisService.set('user', 'ceshi', 100)
    //     return
    // }
    // @Get('getredis')
    // async getRedis() {
    //     const data = await this.commonRedisService.get('user')
    //     return data
    // }
}