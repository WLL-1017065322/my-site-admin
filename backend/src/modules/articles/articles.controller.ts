import { Controller, Get, } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
// import { CommonRedisService } from "src/common/commonRedis.service";

// 在对应的控制器中调用服务

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {
    }

    @Get()
    index() {
        return this.articlesService.articlesInfo()
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