import { Body, Controller, Delete, Get, Param, Post, Put, Query, } from "@nestjs/common";
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

    @Get('list')
    @ApiOperation({
        summary: "获取文章列表"
    })
    getList(@Query() articleDto: Articles) {
        console.log('articleDto', articleDto);
        return this.articlesService.queryAll(articleDto)
    }

    @Get()
    @ApiOperation({
        summary: "获取文章"
    })
    getDetail(@Param() articleDto: Articles) {
        return this.articlesService.queryDetail(articleDto)
    }
    @Delete()
    @ApiOperation({
        summary: "删除文章"
    })
    delArticles(@Body() articleDto: Articles) {
        return this.articlesService.delArticle(articleDto)
        // return this.articlesService.articlesInfo()
    }
    @Post()
    @ApiOperation({
        summary: "新增文章"
    })
    async getArticle(@Body() articleDto: Articles) {
        return await this.articlesService.add(articleDto)
        // return this.articlesService.articlesInfo()
    }

    @Put()
    @ApiOperation({
        summary: "修改文章"
    })
    async putArticle(@Body() articleDto: Articles) {
        return await this.articlesService.put(articleDto)
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