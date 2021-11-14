import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { query } from "express";
import { identity } from "rxjs";
import { Articles } from "src/interface/articles.interface";
import { ArticlesService } from "./articles.service";
// import { CommonRedisService } from "src/common/commonRedis.service";

// 在对应的控制器中调用服务

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {
    }

    @Get('detail')
    @ApiOperation({
        summary: "获取文章"
    })
    getDetail(@Query() query) {
        console.log('获取文章');
        return this.articlesService.queryDetail(query.id)
    }
    @Delete()
    @ApiOperation({
        summary: "删除文章"
    })
    delArticles(@Body() articleDto: Articles) {
        console.log('删除文章',articleDto);
        return this.articlesService.delArticle(articleDto._id)
        // return this.articlesService.articlesInfo()
    }
    @Post()
    @ApiOperation({
        summary: "新增文章"
    })
    async getArticle(@Body() articleDto: Articles) {
        console.log('新增文章',articleDto);
        return await this.articlesService.add(articleDto)
        // return this.articlesService.articlesInfo()
    }

    @Put()
    @ApiOperation({
        summary: "修改文章"
    })
    async putArticle(@Body() articleDto: Articles) {
        console.log('修改文章',articleDto);
        return await this.articlesService.put(articleDto)
        // return this.articlesService.articlesInfo()
    }

    @Get('list')
    @ApiOperation({
        summary: "获取文章列表"
    })
    getList(@Query() articleDto: Articles) {
        console.log('获取文章列表',articleDto);
        return this.articlesService.queryAll(articleDto)
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